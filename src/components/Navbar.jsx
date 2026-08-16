import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

export const Navbar = () => {
  const [time, setTime] = useState('');
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    // Create a unique channel for your Baithak room
    const roomChannel = supabase.channel('baithak_room_presence', {
      config: {
        presence: {
          key: Math.random().toString(36).substring(2, 9), // Unique ID per browser tab
        },
      },
    });

    roomChannel
      .on('presence', { event: 'sync' }, () => {
        // Get all currently connected users in this channel
        const state = roomChannel.presenceState();
        const totalUsers = Object.keys(state).length;
        setOnlineCount(totalUsers > 0 ? totalUsers : 1);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track this user's presence as soon as they connect
          await roomChannel.track({ online_at: new Date().toISOString() });
        }
      });

    // Cleanup channel when component unmounts or tab closes
    return () => {
      supabase.removeChannel(roomChannel);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 text-amber-100/90 bg-linear-to-b from-black to-black/10 ">
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-sm font-medium tracking-wide">
          <span className="text-amber-400 font-bold">{onlineCount}</span> dost online in Baithak
        </span>
      </div>
      <div className="text-sm font-mono tracking-widest bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/30">
        {time}
      </div>
    </nav>
  );
};