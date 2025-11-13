import { create } from 'zustand';
import axios from 'axios';

export const useAdminStore = create((set) => ({
  adminData: null,
  loading: false,
  error: null,

  fetchAdminDetails: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get('http://localhost:2000/api/v1/admin/');

      // NOTE: res.data is the entire response body from the server.
      // Example: If server returns { success: true, data: { id: 1, name: 'Admin' } },
      // then adminData will be set to that entire object.
      set({
        adminData: res.data,
        loading: false,
      });
    } catch (err) {
      set({
        // Safely access the error message from the response or provide a fallback
        error: err.response?.data?.message || 'Something went wrong',
        loading: false,
      });
    }
  },
}));
