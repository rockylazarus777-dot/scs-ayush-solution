export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          hospital_size: string | null;
          urgency: string | null;
          message: string | null;
          status: "new" | "contacted" | "in_progress" | "converted" | "closed";
          notes: string | null;
          source: string | null;
          assigned_to: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["enquiries"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Insert"]>;
      };
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          author: string;
          author_avatar: string | null;
          category: string;
          tags: string[];
          published: boolean;
          featured: boolean;
          read_time: number;
          seo_title: string | null;
          seo_description: string | null;
          views: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["blog_posts"]["Row"],
          "id" | "created_at" | "updated_at" | "views"
        >;
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
      };
      job_listings: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          department: string;
          location: string;
          type: "full-time" | "part-time" | "contract" | "internship";
          experience: string;
          salary_range: string | null;
          description: string;
          requirements: string[];
          responsibilities: string[];
          active: boolean;
          featured: boolean;
          deadline: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["job_listings"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["job_listings"]["Insert"]>;
      };
      job_applications: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          position: string;
          job_id: string | null;
          experience: string;
          resume_url: string | null;
          cover_letter: string | null;
          status: "new" | "reviewing" | "shortlisted" | "interviewed" | "hired" | "rejected";
          notes: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["job_applications"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["job_applications"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          designation: string;
          hospital: string;
          avatar: string | null;
          content: string;
          rating: number;
          service: string | null;
          published: boolean;
          featured: boolean;
          video_url: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["testimonials"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string | null;
          active: boolean;
          source: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["newsletter_subscribers"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
      };
      contact_requests: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          status: "new" | "replied" | "closed";
        };
        Insert: Omit<
          Database["public"]["Tables"]["contact_requests"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["contact_requests"]["Insert"]>;
      };
      admin_users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string;
          role: "super_admin" | "admin" | "editor";
          avatar: string | null;
          last_login: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["admin_users"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["admin_users"]["Insert"]>;
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
  };
}

// Convenience type aliases
export type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type JobListing = Database["public"]["Tables"]["job_listings"]["Row"];
export type JobApplication = Database["public"]["Tables"]["job_applications"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type NewsletterSubscriber = Database["public"]["Tables"]["newsletter_subscribers"]["Row"];
export type ContactRequest = Database["public"]["Tables"]["contact_requests"]["Row"];
