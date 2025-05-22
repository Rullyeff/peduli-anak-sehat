
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface Student {
  id: string;
  nama: string;
  kelas: string;
  health_status: string;
  complaint: string | null;
  last_update: string;
}

export interface Complaint {
  id: string;
  siswa_id: string;
  siswa_name: string;
  created_at: string;
  status: string;
  isi_keluhan: string;
  response?: string;
  response_date?: string;
}

export interface HealthRecord {
  id: string;
  siswa_id: string;
  suhu_tubuh: number;
  berat_badan: number;
  tinggi_badan: number;
  status: string; // Using status instead of kondisi to match DB schema
  keluhan: string | null;
  created_at: string;
  tanggal: string;
}

export interface SystemSettings {
  school_name: string;
  school_address: string;
  enable_notifications: boolean;
  maintenance_mode: boolean;
  data_retention_days: number;
}
