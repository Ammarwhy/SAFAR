import { useState, useEffect, useRef, useMemo } from 'react';
import { useChatStore } from '../stores/chatStore';
import type { MatchRoom } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import { useProfileStore } from '../stores/profileStore';

const ChatPage = () => {
  const { loadCurrentProfile } = useProfileStore();
  const { 
    rooms, vibeRooms, loading, messages, roomProfiles, unreadCounts, lastMessageAt,
    sendMessage, markAsRead, initSocket, joinRoom, loadMatchesForCurrentUser 
  } = useChatStore();
  
  const { trips, loadTripsForCurrentUser, createVibeRoom } = useTripStore();
  
  const { user } = useAuthStore();
  const [selectedRoom, setSelectedRoom] = useState<MatchRoom | null>(null);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMatchesForCurrentUser();
    loadTripsForCurrentUser();
    initSocket();
    loadCurrentProfile();
  }, [loadMatchesForCurrentUser, loadTripsForCurrentUser, initSocket, loadCurrentProfile]);

  useEffect(() => {
    if (selectedRoom) {
      loadMessageHistory(selectedRoom.id, !!selectedRoom.isGroup);
      loadRoomProfiles(selectedRoom.id, !!selectedRoom.isGroup);
      joinRoom(selectedRoom.id);
      markAsRead(selectedRoom.id);
    }
  }, [selectedRoom, loadMessageHistory, loadRoomProfiles, joinRoom, markAsRead]);

  // Auto-mark as read when new messages arrive in the active room
  useEffect(() => {
    if (selectedRoom && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender_id !== user?.id && unreadCounts[selectedRoom.id] > 0) {
        markAsRead(selectedRoom.id);
      }
    }
  }, [messages, selectedRoom, user?.id, markAsRead, unreadCounts]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedRoom) return;
    sendMessage(selectedRoom.id, message, !!selectedRoom.isGroup);
    setMessage('');
  };

  // Sorted Lists
  const sortedVibeRooms = useMemo(() => {
    return [...vibeRooms].sort((a, b) => {
      const timeA = lastMessageAt[a.id] || '0';
      const timeB = lastMessageAt[b.id] || '0';
      return timeB.localeCompare(timeA);
    });
  }, [vibeRooms, lastMessageAt]);

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a, b) => {
      const timeA = lastMessageAt[a.id] || '0';
      const timeB = lastMessageAt[b.id] || '0';
      return timeB.localeCompare(timeA);
    });
  }, [rooms, lastMessageAt]);

  const tripsWithoutRooms = useMemo(() => {
    const existingTripIds = new Set(vibeRooms.map(r => r.other_id));
    return trips.filter(t => !existingTripIds.has(t.id));
  }, [trips, vibeRooms]);

  const handleCreateRoom = async (tripId: string) => {
    await createVibeRoom(tripId);
    await loadMatchesForCurrentUser(); // Refresh chat rooms
  };

  if (loading && rooms.length === 0 && vibeRooms.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="body">Opening secure channels...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      height: '100%', 
      width: '100%',
      display: 'grid', 
      gridTemplateColumns: '300px 1fr', 
      backgroundColor: '#fff', 
      overflow: 'hidden',
    }} className="animate-fade">
      
      {/* Sidebar */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRight: '1px solid var(--border)', 
        height: '100%',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <h2 className="h2" style={{ fontSize: '20px' }}>Messages</h2>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
          <div style={{ padding: '24px 24px 8px', fontSize: '11px', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>
            Expedition Groups
          </div>
          {sortedVibeRooms.map(room => (
            <div 
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              style={{ 
                padding: '12px 24px', 
                display: 'flex', 
                gap: '12px', 
                alignItems: 'center', 
                cursor: 'pointer',
                backgroundColor: selectedRoom?.id === room.id ? 'rgba(55, 27, 23, 0.05)' : 'transparent',
                borderLeft: selectedRoom?.id === room.id ? '4px solid var(--brand)' : '4px solid transparent',
                position: 'relative'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-icons" style={{ color: '#fff', fontSize: '18px' }}>groups</span>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <p style={{ fontWeight: unreadCounts[room.id] ? 900 : 700, fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{room.other_name}</p>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800 }}>VIBE ROOM</p>
              </div>
              {unreadCounts[room.id] > 0 && (
                <div style={{ backgroundColor: '#ef4444', color: '#fff', minWidth: '18px', height: '18px', borderRadius: '9px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', fontWeight: 900, boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}>
                  {unreadCounts[room.id]}
                </div>
              )}
            </div>
          ))}

          {tripsWithoutRooms.length > 0 && (
            <>
              <div style={{ padding: '32px 24px 8px', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6 }}>
                Initialize Room
              </div>
              {tripsWithoutRooms.map(trip => (
                <div 
                  key={trip.id}
                  style={{ 
                    padding: '12px 24px', 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'center', 
                    opacity: 0.7
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-icons" style={{ color: 'var(--text-muted)', fontSize: '18px' }}>add_comment</span>
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{trip.title}</p>
                    <button 
                      onClick={() => handleCreateRoom(trip.id)}
                      style={{ background: 'none', border: 'none', padding: 0, color: 'var(--brand)', fontSize: '10px', fontWeight: 800, cursor: 'pointer', textAlign: 'left' }}
                    >
                      CREATE VIBE ROOM
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          <div style={{ padding: '32px 24px 8px', fontSize: '11px', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>
            Nomad Matches
          </div>
          {sortedRooms.map(room => (
            <div 
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              style={{ 
                padding: '12px 24px', 
                display: 'flex', 
                gap: '12px', 
                alignItems: 'center', 
                cursor: 'pointer',
                backgroundColor: selectedRoom?.id === room.id ? 'rgba(55, 27, 23, 0.05)' : 'transparent',
                borderLeft: selectedRoom?.id === room.id ? '4px solid var(--brand)' : '4px solid transparent',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={room.other_avatar || `https://i.pravatar.cc/100?u=${room.other_id}`} alt="" style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', border: '2px solid #fff' }}></div>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <p style={{ fontWeight: unreadCounts[room.id] ? 900 : 700, fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{room.other_name}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Direct Message</p>
              </div>
              {unreadCounts[room.id] > 0 && (
                <div style={{ backgroundColor: '#ef4444', color: '#fff', minWidth: '18px', height: '18px', borderRadius: '9px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', fontWeight: 900, boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}>
                  {unreadCounts[room.id]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div style={{ backgroundColor: 'var(--bg)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {selectedRoom ? (
          <>
            <div style={{ padding: '16px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {selectedRoom.isGroup ? (
                   <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <span className="material-icons" style={{ color: '#fff', fontSize: '20px' }}>groups</span>
                   </div>
                ) : (
                  <img src={selectedRoom.other_avatar || `https://i.pravatar.cc/100?u=${selectedRoom.other_id}`} alt="" style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' }} />
                )}
                <div>
                  <p style={{ fontWeight: 800, fontSize: '15px' }}>{selectedRoom.other_name}</p>
                  <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>{selectedRoom.isGroup ? 'GROUP CHAT' : 'ACTIVE NOW'}</p>
                </div>
              </div>
            </div>

            <div 
              ref={scrollRef}
              style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}
              className="custom-scrollbar"
            >
              {messages.map((msg, i) => {
                const isMine = msg.sender_id === user?.id;
                const senderProfile = roomProfiles[msg.sender_id];
                const senderName = isMine ? 'You' : (senderProfile?.name || `Nomad ${msg.sender_id?.slice(0,4) || 'Anon'}`);
                
                return (
                  <div key={msg.id || i} style={{ alignSelf: isMine ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                    {!isMine && selectedRoom.isGroup && (
                      <p style={{ fontSize: '9px', fontWeight: 900, color: 'var(--brand)', marginBottom: '4px', marginLeft: '4px', textTransform: 'uppercase' }}>
                        {senderName}
                      </p>
                    )}
                    <div style={{ 
                      backgroundColor: isMine ? 'var(--brand)' : '#fff', 
                      color: isMine ? '#fff' : 'var(--text-primary)', 
                      padding: '10px 16px', 
                      borderRadius: isMine ? '16px 16px 0 16px' : '0 16px 16px 16px', 
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
                      fontSize: '13px'
                    }}>
                      {msg.content}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isMine && (
                        <span className="material-icons" style={{ fontSize: '12px', color: msg.is_read ? 'var(--brand)' : 'var(--text-muted)' }}>
                          {msg.is_read ? 'done_all' : 'done'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '20px 32px', borderTop: '1px solid var(--border)', backgroundColor: '#fff', flexShrink: 0 }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..." 
                  style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', outline: 'none', fontSize: '13px' }}
                />
                <button type="submit" style={{ backgroundColor: 'var(--brand)', color: '#fff', width: '42px', height: '42px', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-icons" style={{ fontSize: '20px' }}>send</span>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', opacity: 0.5 }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--brand)' }}>forum</span>
            <p className="h2" style={{ fontSize: '18px' }}>Select a Channel</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
