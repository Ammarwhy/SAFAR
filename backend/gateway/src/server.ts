import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"]
  }
});

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send({ status: 'ok', timestamp: new Date() });
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', async (data) => {
    const { roomId, senderId, content, isGroup } = data;
    
    // Broadcast to the room
    io.to(roomId).emit('receive_message', {
      senderId,
      roomId,
      content,
      sent_at: new Date().toISOString()
    });

    // Persist to Supabase
    try {
      const payload: any = {
        sender_id: senderId,
        content: content,
        type: 'Text'
      };

      if (isGroup) {
        payload.room_id = roomId;
      } else {
        payload.match_id = roomId;
      }

      const { error } = await supabase.from('messages').insert(payload);
      if (error) throw error;
    } catch (err) {
      console.error('Error persisting message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`SAFAR Backend listening on port ${PORT}`);
});
