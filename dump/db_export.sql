--
-- PostgreSQL database dump
--

\restrict ZVerWQr7ypL0yH9wvZmbskwD3DQlaALtLaj0fC1prh6YRM59NXMniyuA0wcOYtQ

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: activity_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.activity_type AS ENUM (
    'login',
    'logout',
    'listing_created',
    'listing_approved',
    'listing_rejected',
    'message_sent',
    'interest_expressed',
    'profile_updated',
    'blog_post_created'
);


ALTER TYPE public.activity_type OWNER TO postgres;

--
-- Name: admin_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.admin_role AS ENUM (
    'super_admin',
    'verification_admin',
    'content_admin',
    'support_admin',
    'analytics_admin'
);


ALTER TYPE public.admin_role OWNER TO postgres;

--
-- Name: license_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.license_type AS ENUM (
    'exploration',
    'mining',
    'processing'
);


ALTER TYPE public.license_type OWNER TO postgres;

--
-- Name: listing_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.listing_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'inactive',
    'closed'
);


ALTER TYPE public.listing_status OWNER TO postgres;

--
-- Name: listing_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.listing_type AS ENUM (
    'mineral',
    'partnership',
    'project'
);


ALTER TYPE public.listing_type OWNER TO postgres;

--
-- Name: main_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.main_category AS ENUM (
    'minerals',
    'mining_tools',
    'mining_services',
    'mining_ppe',
    'mining_equipment'
);


ALTER TYPE public.main_category OWNER TO postgres;

--
-- Name: membership_tier; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.membership_tier AS ENUM (
    'basic',
    'standard',
    'premium'
);


ALTER TYPE public.membership_tier OWNER TO postgres;

--
-- Name: message_context; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.message_context AS ENUM (
    'marketplace',
    'project_interest',
    'general'
);


ALTER TYPE public.message_context OWNER TO postgres;

--
-- Name: mineral_subcategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.mineral_subcategory AS ENUM (
    'metallic',
    'non_metallic',
    'marble_natural_stone',
    'gravel_sand_aggregate',
    'coal_peat',
    'other_minerals'
);


ALTER TYPE public.mineral_subcategory OWNER TO postgres;

--
-- Name: notification_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.notification_type AS ENUM (
    'message',
    'listing_approved',
    'listing_rejected',
    'interest_received',
    'system'
);


ALTER TYPE public.notification_type OWNER TO postgres;

--
-- Name: payment_method; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_method AS ENUM (
    'bank_transfer',
    'airtel_money',
    'wechat_alipay'
);


ALTER TYPE public.payment_method OWNER TO postgres;

--
-- Name: ppe_subcategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.ppe_subcategory AS ENUM (
    'head_face_protection',
    'respiratory_protection',
    'hand_foot_protection',
    'fall_protection',
    'protective_clothing',
    'other_ppe'
);


ALTER TYPE public.ppe_subcategory OWNER TO postgres;

--
-- Name: profile_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.profile_type AS ENUM (
    'individual',
    'company'
);


ALTER TYPE public.profile_type OWNER TO postgres;

--
-- Name: project_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.project_status AS ENUM (
    'active',
    'pending',
    'completed',
    'suspended',
    'closed'
);


ALTER TYPE public.project_status OWNER TO postgres;

--
-- Name: seller_verification_document_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.seller_verification_document_type AS ENUM (
    'certificate_of_incorporation',
    'company_profile',
    'shareholder_list',
    'tax_certificate',
    'letter_of_authorization',
    'director_id'
);


ALTER TYPE public.seller_verification_document_type OWNER TO postgres;

--
-- Name: seller_verification_request_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.seller_verification_request_status AS ENUM (
    'draft',
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.seller_verification_request_status OWNER TO postgres;

--
-- Name: service_subcategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.service_subcategory AS ENUM (
    'analysis_services',
    'consulting_advisory',
    'drilling_blasting',
    'exploration_surveying',
    'freight_services',
    'mine_extraction',
    'mineral_processing',
    'supply_chain',
    'other_services'
);


ALTER TYPE public.service_subcategory OWNER TO postgres;

--
-- Name: setting_data_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.setting_data_type AS ENUM (
    'boolean',
    'number',
    'string',
    'json'
);


ALTER TYPE public.setting_data_type OWNER TO postgres;

--
-- Name: template_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.template_type AS ENUM (
    'buyer_interest_to_buyer',
    'buyer_interest_to_seller',
    'buyer_interest_to_admin'
);


ALTER TYPE public.template_type OWNER TO postgres;

--
-- Name: thread_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.thread_status AS ENUM (
    'open',
    'closed'
);


ALTER TYPE public.thread_status OWNER TO postgres;

--
-- Name: thread_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.thread_type AS ENUM (
    'project_interest',
    'marketplace_inquiry',
    'admin_to_seller',
    'admin_to_buyer',
    'general'
);


ALTER TYPE public.thread_type OWNER TO postgres;

--
-- Name: ticket_priority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.ticket_priority AS ENUM (
    'low',
    'normal',
    'high',
    'urgent'
);


ALTER TYPE public.ticket_priority OWNER TO postgres;

--
-- Name: ticket_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.ticket_status AS ENUM (
    'open',
    'in_progress',
    'waiting_user',
    'resolved',
    'closed'
);


ALTER TYPE public.ticket_status OWNER TO postgres;

--
-- Name: tool_subcategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tool_subcategory AS ENUM (
    'drilling_equipment',
    'energy_machines',
    'engineering_devices',
    'heavy_equipment',
    'industrial_equipment',
    'marble_machinery',
    'ore_processing',
    'underground_mining',
    'other_tools'
);


ALTER TYPE public.tool_subcategory OWNER TO postgres;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'buyer',
    'seller'
);


ALTER TYPE public.user_role OWNER TO postgres;

--
-- Name: verification_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.verification_status AS ENUM (
    'not_requested',
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.verification_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_logs (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying,
    activity_type public.activity_type NOT NULL,
    description text NOT NULL,
    ip_address character varying(45),
    user_agent text,
    metadata jsonb,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.activity_logs OWNER TO postgres;

--
-- Name: admin_audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_audit_logs (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    admin_id character varying NOT NULL,
    action character varying(100) NOT NULL,
    target_type character varying(50),
    target_id character varying,
    changes jsonb,
    ip_address character varying(45),
    user_agent text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.admin_audit_logs OWNER TO postgres;

--
-- Name: admin_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_permissions (
    id integer NOT NULL,
    can_manage_cms boolean DEFAULT false NOT NULL,
    admin_user_id character varying(255),
    admin_role public.admin_role DEFAULT 'content_admin'::public.admin_role NOT NULL,
    can_manage_users boolean DEFAULT false NOT NULL,
    can_manage_listings boolean DEFAULT false NOT NULL,
    can_manage_projects boolean DEFAULT false NOT NULL,
    can_manage_blog boolean DEFAULT false NOT NULL,
    can_view_analytics boolean DEFAULT false NOT NULL,
    can_manage_messages boolean DEFAULT false NOT NULL,
    can_manage_verification boolean DEFAULT false NOT NULL,
    can_manage_settings boolean DEFAULT false NOT NULL,
    can_manage_admins boolean DEFAULT false NOT NULL,
    can_access_audit_logs boolean DEFAULT false NOT NULL,
    can_manage_documents boolean DEFAULT false NOT NULL,
    can_reset_passwords boolean DEFAULT false NOT NULL,
    can_force_logout boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.admin_permissions OWNER TO postgres;

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_permissions_id_seq OWNER TO postgres;

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_permissions_id_seq OWNED BY public.admin_permissions.id;


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_posts (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    author_id character varying NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    excerpt text,
    content text NOT NULL,
    image_url character varying,
    category character varying,
    published boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.blog_posts OWNER TO postgres;

--
-- Name: buyer_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buyer_requests (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    buyer_id character varying NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    mineral_type character varying,
    quantity character varying,
    budget character varying,
    location character varying,
    status character varying DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    item_id character varying(5),
    main_category public.main_category,
    mineral_subcategory public.mineral_subcategory,
    tool_subcategory public.tool_subcategory,
    service_subcategory public.service_subcategory,
    ppe_subcategory public.ppe_subcategory,
    specific_type character varying,
    country character varying(100),
    verified boolean DEFAULT false NOT NULL,
    expiry_date timestamp without time zone
);


ALTER TABLE public.buyer_requests OWNER TO postgres;

--
-- Name: contact_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_settings (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    office_address text NOT NULL,
    phone character varying NOT NULL,
    email character varying NOT NULL,
    support_email character varying,
    monday_friday character varying DEFAULT '8:00 AM - 5:00 PM'::character varying NOT NULL,
    saturday character varying DEFAULT '9:00 AM - 1:00 PM'::character varying,
    sunday character varying DEFAULT 'Closed'::character varying,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.contact_settings OWNER TO postgres;

--
-- Name: contact_submissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_submissions (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50),
    subject character varying(255) NOT NULL,
    message text NOT NULL,
    status character varying DEFAULT 'new'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.contact_submissions OWNER TO postgres;

--
-- Name: document_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.document_templates (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    template_name character varying(100) NOT NULL,
    document_type character varying(50) NOT NULL,
    content text NOT NULL,
    variables text[],
    version character varying(20) DEFAULT '1.0'::character varying NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.document_templates OWNER TO postgres;

--
-- Name: email_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email_templates (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    template_key character varying(100) NOT NULL,
    subject character varying(255) NOT NULL,
    body_html text NOT NULL,
    body_text text,
    variables text[],
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.email_templates OWNER TO postgres;

--
-- Name: express_interest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.express_interest (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    project_id character varying,
    user_id character varying NOT NULL,
    message text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    listing_id character varying
);


ALTER TABLE public.express_interest OWNER TO postgres;

--
-- Name: login_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_history (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying NOT NULL,
    ip_address character varying,
    user_agent text,
    login_success boolean DEFAULT false NOT NULL,
    failure_reason text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.login_history OWNER TO postgres;

--
-- Name: marketplace_listings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marketplace_listings (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    seller_id character varying NOT NULL,
    type public.listing_type NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    mineral_type character varying,
    grade character varying,
    location character varying NOT NULL,
    quantity character varying,
    price character varying,
    image_url character varying,
    status public.listing_status DEFAULT 'pending'::public.listing_status NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    item_id character varying(5),
    main_category public.main_category,
    mineral_subcategory public.mineral_subcategory,
    tool_subcategory public.tool_subcategory,
    service_subcategory public.service_subcategory,
    ppe_subcategory public.ppe_subcategory,
    specific_type character varying
);


ALTER TABLE public.marketplace_listings OWNER TO postgres;

--
-- Name: membership_benefits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membership_benefits (
    id character varying DEFAULT (gen_random_uuid())::character varying NOT NULL,
    tier public.membership_tier NOT NULL,
    max_active_rfqs integer NOT NULL,
    can_access_analytics boolean DEFAULT false NOT NULL,
    can_direct_message boolean DEFAULT false NOT NULL,
    priority_support boolean DEFAULT false NOT NULL,
    visibility_ranking integer NOT NULL,
    monthly_price numeric(10,2) DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.membership_benefits OWNER TO postgres;

--
-- Name: message_idempotency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message_idempotency (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    key character varying(255) NOT NULL,
    message_id character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.message_idempotency OWNER TO postgres;

--
-- Name: message_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message_templates (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    type public.template_type NOT NULL,
    subject character varying(255) NOT NULL,
    content text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.message_templates OWNER TO postgres;

--
-- Name: message_threads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message_threads (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    project_id character varying,
    listing_id character varying,
    buyer_id character varying NOT NULL,
    seller_id character varying,
    status public.thread_status DEFAULT 'open'::public.thread_status NOT NULL,
    last_message_at timestamp without time zone DEFAULT now() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    context public.message_context DEFAULT 'general'::public.message_context,
    type public.thread_type DEFAULT 'general'::public.thread_type NOT NULL,
    admin_id character varying,
    created_by character varying NOT NULL,
    is_admin_support boolean DEFAULT false NOT NULL,
    assigned_admin_id character varying(255),
    ticket_status character varying(32) DEFAULT 'open'::character varying NOT NULL,
    ticket_priority character varying(32) DEFAULT 'normal'::character varying NOT NULL,
    resolved_at timestamp with time zone
);


ALTER TABLE public.message_threads OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    sender_id character varying NOT NULL,
    receiver_id character varying NOT NULL,
    subject character varying(255),
    content text NOT NULL,
    read boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    related_project_id character varying,
    related_listing_id character varying,
    is_auto_relay boolean DEFAULT false NOT NULL,
    closed boolean DEFAULT false NOT NULL,
    thread_id character varying,
    unread boolean DEFAULT true NOT NULL,
    context public.message_context DEFAULT 'general'::public.message_context
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying NOT NULL,
    type public.notification_type NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    link character varying,
    read boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: payment_method_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_method_details (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    method public.payment_method NOT NULL,
    name character varying NOT NULL,
    description text,
    instructions text,
    account_details jsonb,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    currency_code character varying(3) DEFAULT 'USD'::character varying NOT NULL,
    currency_name character varying(100) DEFAULT 'US Dollar'::character varying NOT NULL
);


ALTER TABLE public.payment_method_details OWNER TO postgres;

--
-- Name: platform_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.platform_settings (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    key character varying(100) NOT NULL,
    value text NOT NULL,
    data_type public.setting_data_type DEFAULT 'string'::public.setting_data_type NOT NULL,
    description text,
    category character varying(50) NOT NULL,
    is_public boolean DEFAULT false NOT NULL,
    updated_by character varying,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.platform_settings OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    license_type public.license_type NOT NULL,
    minerals text[] NOT NULL,
    location character varying NOT NULL,
    latitude numeric(10,7),
    longitude numeric(10,7),
    status public.project_status DEFAULT 'active'::public.project_status NOT NULL,
    image_url character varying,
    area character varying,
    estimated_value character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    item_id character varying(5),
    owner_id character varying
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: seller_verification_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seller_verification_documents (
    id character varying DEFAULT (gen_random_uuid())::character varying NOT NULL,
    request_id character varying NOT NULL,
    document_type public.seller_verification_document_type NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path text NOT NULL,
    file_size integer,
    mime_type character varying(100),
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.seller_verification_documents OWNER TO postgres;

--
-- Name: seller_verification_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seller_verification_requests (
    id character varying DEFAULT (gen_random_uuid())::character varying NOT NULL,
    seller_id character varying NOT NULL,
    status public.seller_verification_request_status DEFAULT 'draft'::public.seller_verification_request_status NOT NULL,
    rejection_reason text,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reviewed_at timestamp without time zone,
    reviewed_by character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.seller_verification_requests OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: settings_audit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings_audit (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    setting_key character varying(100) NOT NULL,
    old_value text,
    new_value text NOT NULL,
    changed_by character varying NOT NULL,
    changed_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.settings_audit OWNER TO postgres;

--
-- Name: sustainability_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sustainability_content (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    section character varying(255) NOT NULL,
    content text NOT NULL,
    image_url character varying,
    "order" integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sustainability_content OWNER TO postgres;

--
-- Name: tier_upgrade_payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tier_upgrade_payments (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    upgrade_request_id character varying NOT NULL,
    user_id character varying NOT NULL,
    requested_tier public.membership_tier NOT NULL,
    payment_method public.payment_method NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency character varying DEFAULT 'ZMW'::character varying NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    payment_details jsonb,
    proof_of_payment_url character varying,
    submitted_at timestamp without time zone DEFAULT now() NOT NULL,
    verified_at timestamp without time zone,
    verified_by character varying,
    rejection_reason text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    amount_usd numeric(10,2) NOT NULL,
    exchange_rate numeric(10,6)
);


ALTER TABLE public.tier_upgrade_payments OWNER TO postgres;

--
-- Name: tier_upgrade_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tier_upgrade_requests (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying NOT NULL,
    requested_tier public.membership_tier NOT NULL,
    status character varying DEFAULT 'draft'::character varying NOT NULL,
    rejection_reason text,
    submitted_at timestamp without time zone,
    reviewed_at timestamp without time zone,
    reviewed_by character varying,
    document_count integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tier_upgrade_requests OWNER TO postgres;

--
-- Name: tier_usage_tracking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tier_usage_tracking (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying NOT NULL,
    month character varying(7) NOT NULL,
    active_rfqs_count integer DEFAULT 0 NOT NULL,
    messages_count integer DEFAULT 0 NOT NULL,
    analytics_views integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tier_usage_tracking OWNER TO postgres;

--
-- Name: two_factor_auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.two_factor_auth (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying NOT NULL,
    enabled boolean DEFAULT false NOT NULL,
    secret character varying,
    backup_codes text[],
    last_used timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.two_factor_auth OWNER TO postgres;

--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying NOT NULL,
    profile_type public.profile_type DEFAULT 'individual'::public.profile_type NOT NULL,
    company_name character varying,
    phone_number character varying,
    location character varying,
    bio text,
    interests text[],
    verified boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    profile_image_url character varying,
    role public.user_role DEFAULT 'buyer'::public.user_role NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    username character varying,
    password character varying,
    membership_tier public.membership_tier DEFAULT 'basic'::public.membership_tier NOT NULL,
    verification_status public.verification_status DEFAULT 'not_requested'::public.verification_status NOT NULL,
    badge_color character varying,
    clerk_id character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: verification_queue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification_queue (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    listing_id character varying NOT NULL,
    submitted_at timestamp without time zone DEFAULT now() NOT NULL,
    reviewed_at timestamp without time zone,
    reviewed_by character varying,
    notes text
);


ALTER TABLE public.verification_queue OWNER TO postgres;

--
-- Name: verification_rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification_rules (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    rule_name character varying(100) NOT NULL,
    description text,
    required_for character varying(50) NOT NULL,
    document_types text[] NOT NULL,
    min_documents integer DEFAULT 1 NOT NULL,
    auto_approve boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.verification_rules OWNER TO postgres;

--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    video_url text NOT NULL,
    thumbnail_url text,
    duration character varying,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: admin_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_permissions ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_id_seq'::regclass);


--
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_logs (id, user_id, activity_type, description, ip_address, user_agent, metadata, created_at) FROM stdin;
486ab7fd-06b6-45fc-9f2b-f9d09656d6e8	test-buyer-789	interest_expressed	User expressed interest in project 81d1d9d7-ee8d-4b26-8081-e91dd47cc160	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	\N	2025-10-30 12:39:52.656947
c5a9c66f-1c8e-4476-bc00-e66ff69e8de1	test-buyer-789	interest_expressed	User expressed interest in project 85d163eb-edc5-4a3b-8893-8a34dac15443	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	\N	2025-10-30 13:05:28.999137
c69269da-b23a-4020-8687-84ee8f6c27f8	test-admin-123	interest_expressed	User expressed interest in project 81d1d9d7-ee8d-4b26-8081-e91dd47cc160	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	\N	2025-10-30 14:23:58.40723
6eed7463-aa7a-4d23-abf8-ed7b41d0ab61	test-admin-123	interest_expressed	User expressed interest in project e0682140-380f-427f-a420-8692103240de	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	\N	2025-10-30 14:24:01.544311
a719ea03-4f56-4258-a338-841bd3dce49c	test-buyer-789	interest_expressed	User expressed interest in project 36d4321b-df17-4094-8677-fd8f5af6595b	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	\N	2025-10-31 11:34:34.185213
dd2f2578-8845-4579-8112-6324bfef2bcc	test-admin-super	interest_expressed	User expressed interest in project be92ac88-bd10-4f8d-995a-b2ff1f10854c	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	\N	2025-12-08 11:03:55.615862
d76d2a40-231e-4d88-a794-5df8194b95a8	test-buyer-789	interest_expressed	User expressed interest in project 1254dd1c-9c2d-4d04-b381-2dc1f4b99797	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	\N	2025-12-12 10:45:43.908157
e8d9ebd7-0c36-4ca7-9715-2391e93f8776	test-buyer-789	interest_expressed	User expressed interest in project aa4b0660-c009-4ed9-9c2d-9f224d9af255	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	\N	2025-12-12 10:59:26.697929
96ae0bdb-64f4-48d0-a0f9-91288ed90871	test-admin-super	logout	User logged out	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	\N	2025-12-18 10:28:35.429124
543f99ab-825b-40b1-8fe9-e3919beb7e14	test-seller-456	listing_approved	Listing "Gold Ore Concentrate" was approved by admin	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	{"listingId": "686e7729-2128-4906-a423-d94de2cf64f4", "reviewerId": "e0167fe5-a82a-46a9-b76d-77dbf049ff2b"}	2026-01-27 17:29:21.802499
53c029f7-cd2f-4183-8030-4ad2bd2c500d	test-seller-456	listing_approved	Listing "Mobile Jaw Crusher & Cone Plant" was approved by admin	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	{"listingId": "3598b584-b7c3-4b17-9a41-b4af1fd7b2d8", "reviewerId": "e0167fe5-a82a-46a9-b76d-77dbf049ff2b"}	2026-01-27 17:29:25.023376
\.


--
-- Data for Name: admin_audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_audit_logs (id, admin_id, action, target_type, target_id, changes, ip_address, user_agent, created_at) FROM stdin;
\.


--
-- Data for Name: admin_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_permissions (id, can_manage_cms, admin_user_id, admin_role, can_manage_users, can_manage_listings, can_manage_projects, can_manage_blog, can_view_analytics, can_manage_messages, can_manage_verification, can_manage_settings, can_manage_admins, can_access_audit_logs, can_manage_documents, can_reset_passwords, can_force_logout, created_at, updated_at) FROM stdin;
3	t	test-admin-content	content_admin	f	f	f	t	f	f	f	f	f	f	t	f	f	2025-12-02 10:55:35.43347	2025-12-02 09:19:50.174
4	f	test-admin-support	support_admin	f	f	f	f	t	t	f	f	f	f	f	t	t	2025-12-02 10:55:35.43542	2025-12-02 09:22:18.213
2	f	test-admin-verification	verification_admin	f	t	f	f	t	t	t	f	f	t	f	t	t	2025-12-02 10:55:35.431229	2025-12-02 10:13:44.136
6	t	f93f34bd-316f-44c2-b4a1-76431aec4013	super_admin	t	t	t	t	t	t	t	t	t	t	t	t	t	2026-01-27 00:53:59.503717	2026-01-27 08:48:40.466
5	f	test-admin-analytics	support_admin	t	f	f	f	f	t	f	f	f	t	f	f	f	2025-12-02 10:55:35.437659	2025-12-09 08:49:54.168
1	t	test-admin-super	super_admin	t	t	t	t	t	t	t	t	t	t	t	t	t	2025-12-02 10:55:35.425942	2025-12-18 08:28:29.324
7	f	e0167fe5-a82a-46a9-b76d-77dbf049ff2b	verification_admin	f	t	f	f	t	t	t	f	f	t	f	t	t	2026-01-27 01:59:52.760315	2026-01-27 01:59:52.760315
\.


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog_posts (id, author_id, title, slug, excerpt, content, image_url, category, published, created_at, updated_at) FROM stdin;
7710c813-443a-4055-9bc7-5d5bbe652c4e	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-10-23 13:09:28.898604	2025-10-23 13:09:28.898604
4e9f95d5-c896-47c7-959e-b63cb4e03354	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-10-23 13:09:28.898604	2025-10-23 13:09:28.898604
6cd8ec4f-7afe-4195-a5d8-a7928421fc82	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-10-23 13:09:28.898604	2025-10-23 13:09:28.898604
ece4fb72-c943-40c6-843a-c47e8af28d86	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-10-23 13:09:28.898604	2025-10-23 13:09:28.898604
469bc74e-7c90-41a2-8611-353381f3b314	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-10-23 13:09:28.898604	2025-10-23 13:09:28.898604
e1cdd4f3-c797-41ea-83eb-a41d0ae4fb35	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-10-23 14:24:13.558299	2025-10-23 14:24:13.558299
ebbcaaad-bd36-4286-996f-a65c8b9226e5	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-10-23 14:24:13.558299	2025-10-23 14:24:13.558299
c578b17c-628f-4677-8d3f-a4e22f6cd8dd	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-10-23 14:24:13.558299	2025-10-23 14:24:13.558299
d982c79e-7c09-4784-ba70-d9decd845619	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-10-23 14:24:13.558299	2025-10-23 14:24:13.558299
033e9a20-a910-43b0-a182-65c7536394d2	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-10-23 14:24:13.558299	2025-10-23 14:24:13.558299
abe644e4-1f05-4138-837c-8ca4bb53e243	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-10-23 14:38:31.547942	2025-10-23 14:38:31.547942
397815fb-9d74-4db2-89af-637649a152bb	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-10-23 14:38:31.547942	2025-10-23 14:38:31.547942
f6428fb4-76bb-41db-b032-230728174e2e	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-10-23 14:38:31.547942	2025-10-23 14:38:31.547942
4d8a8add-669e-4299-86f0-d5efcc09ac99	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-10-23 14:38:31.547942	2025-10-23 14:38:31.547942
0b4fbac1-22c9-4454-996c-ba010734062a	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-10-23 14:38:31.547942	2025-10-23 14:38:31.547942
bb7de8ad-0756-4960-b0aa-c397787d538c	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-11-03 12:28:51.636684	2025-11-03 12:28:51.636684
5fa3780c-c1cf-403f-8fdd-2df701234664	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-11-03 12:28:51.636684	2025-11-03 12:28:51.636684
fd595a03-1a91-4e14-b833-e7885d178459	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-11-03 12:28:51.636684	2025-11-03 12:28:51.636684
41092286-7ab2-46f4-af6e-c40b6dfbd304	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-11-03 12:28:51.636684	2025-11-03 12:28:51.636684
da8be7e9-9a46-49a2-8559-862b0a70b81b	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-11-03 12:28:51.636684	2025-11-03 12:28:51.636684
4892645c-ee21-47b1-be7c-d54396a39d3c	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-11-03 12:34:24.11439	2025-11-03 12:34:24.11439
b8f67310-b6be-44ae-ab2b-bf8a93fa5a5c	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-11-03 12:34:24.11439	2025-11-03 12:34:24.11439
0d46c40d-a67a-4643-b519-eaa3f9757012	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-11-03 12:34:24.11439	2025-11-03 12:34:24.11439
0cb71e59-8e92-4154-9075-2eb7c0916199	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-11-03 12:34:24.11439	2025-11-03 12:34:24.11439
6f4f82ca-437d-49f7-8880-d7aa65b3e4f9	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-11-03 12:34:24.11439	2025-11-03 12:34:24.11439
ab59da08-342e-4e7e-8999-dd75ede05cfc	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-11-03 13:33:44.092285	2025-11-03 13:33:44.092285
499206e3-e44e-4894-b3bf-89c1c4d99d81	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-11-03 13:33:44.092285	2025-11-03 13:33:44.092285
808a985d-4d1a-4d24-8bcf-6a72279f11f8	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-11-03 13:33:44.092285	2025-11-03 13:33:44.092285
d25f6df4-991e-43a9-9ef4-55b330344060	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-11-03 13:33:44.092285	2025-11-03 13:33:44.092285
6dbca682-5dd5-4236-b164-595406182de8	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-11-03 13:33:44.092285	2025-11-03 13:33:44.092285
fafdd1a1-b572-4ba1-b1c3-d7c81260df98	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-12-08 11:35:38.335792	2025-12-08 11:35:38.335792
8f8563e5-aa07-4d8f-8eda-24ff230806e2	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-12-08 11:35:38.335792	2025-12-08 11:35:38.335792
45260067-8402-46f2-b0f2-0299ffe5816d	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-12-08 11:35:38.335792	2025-12-08 11:35:38.335792
0820c572-ca1d-4428-8137-580829007573	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-12-08 11:35:38.335792	2025-12-08 11:35:38.335792
0e6c4009-57c4-43b1-a37e-1432c58952e0	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-12-08 11:35:38.335792	2025-12-08 11:35:38.335792
41c30d84-fe24-4829-a3dd-bd02ac9a43a7	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2025-12-08 13:12:27.300328	2025-12-08 13:12:27.300328
6aad8078-3904-4e21-be2c-33431dc59470	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2025-12-08 13:12:27.300328	2025-12-08 13:12:27.300328
6eff0b12-aa4f-4670-93b4-6d040ac7c36a	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2025-12-08 13:12:27.300328	2025-12-08 13:12:27.300328
af6dc1a8-1f09-483e-8862-64435cbc23a2	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2025-12-08 13:12:27.300328	2025-12-08 13:12:27.300328
0d91d176-bcc1-4ca4-bbc0-8496328302a6	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2025-12-08 13:12:27.300328	2025-12-08 13:12:27.300328
0e93417f-adf2-4466-b120-5189f314bca4	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-24 12:27:54.351937	2026-01-24 12:27:54.351937
cfdf934c-6fa3-4e10-9829-f46fd2b17099	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-24 12:27:54.351937	2026-01-24 12:27:54.351937
4fc44a34-0e90-4c22-90dc-2a485a79375c	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-24 12:27:54.351937	2026-01-24 12:27:54.351937
f5ec0af0-94fa-4bad-a532-a33cdf72250e	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-24 12:27:54.351937	2026-01-24 12:27:54.351937
abc7f28f-dcca-4fe6-8281-a5a5f10d4604	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-24 12:27:54.351937	2026-01-24 12:27:54.351937
668165ee-6844-4ed0-b877-c0a53dd0f3d8	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-25 23:21:09.948011	2026-01-25 23:21:09.948011
33a6093b-9eef-427f-b262-b80be4916bb5	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-25 23:21:09.948011	2026-01-25 23:21:09.948011
f3f51b00-86eb-484c-862c-9792f1e44962	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-25 23:21:09.948011	2026-01-25 23:21:09.948011
678c800b-5bc9-411a-95ff-b27dc595c231	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-25 23:21:09.948011	2026-01-25 23:21:09.948011
3885c59a-5a90-4aec-88a1-b9731441e655	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-25 23:21:09.948011	2026-01-25 23:21:09.948011
33fa3520-1aac-4930-bcfe-87d9e50b13b2	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 01:07:46.315431	2026-01-26 01:07:46.315431
a0ecd4dc-1407-4599-9b6b-95908991c7b5	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 01:07:46.315431	2026-01-26 01:07:46.315431
c51a049d-1308-4147-b6e2-dc17d83c3bf3	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 01:07:46.315431	2026-01-26 01:07:46.315431
a02fa20a-ab72-4b52-a590-835f32e70501	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 01:07:46.315431	2026-01-26 01:07:46.315431
cdda8048-61ca-44a6-bbbd-42575f594157	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 01:07:46.315431	2026-01-26 01:07:46.315431
53df199e-de98-48cd-a641-46dddcaff58f	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 01:31:56.920512	2026-01-26 01:31:56.920512
25a3c2d4-b748-4120-af58-dd374977fa54	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 01:31:56.920512	2026-01-26 01:31:56.920512
642a2393-a27d-4844-9451-852d10ef2d82	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 01:31:56.920512	2026-01-26 01:31:56.920512
e36bdbf2-cb7b-46f4-ac1c-aad56800f9e0	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 01:31:56.920512	2026-01-26 01:31:56.920512
e5c57f0d-1ef6-47ec-b904-34db5e15d7df	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 01:31:56.920512	2026-01-26 01:31:56.920512
1c19749d-eb76-4297-afe6-c630dfe2c98c	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 01:33:45.630799	2026-01-26 01:33:45.630799
365a3b8a-1a46-4b83-9e00-f736c95ed25a	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 01:33:45.630799	2026-01-26 01:33:45.630799
69fdf986-42dd-4690-89cc-11849ab5caaf	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 01:33:45.630799	2026-01-26 01:33:45.630799
b7264215-dbdc-427d-a024-9aaa892f0242	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 01:33:45.630799	2026-01-26 01:33:45.630799
c6fd0220-3d2b-4b6d-90b1-57958cf925da	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 01:33:45.630799	2026-01-26 01:33:45.630799
ef3b4e79-b936-4612-9015-5329d554982d	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 03:29:06.974082	2026-01-26 03:29:06.974082
42dbde18-5cd3-4ced-8347-dcf37f35be52	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 03:29:06.974082	2026-01-26 03:29:06.974082
22a26f15-b8a3-4597-8998-533992371488	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 03:29:06.974082	2026-01-26 03:29:06.974082
f21832ee-5de7-44ca-9070-3b1c9381a309	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 03:29:06.974082	2026-01-26 03:29:06.974082
d6a82cc8-7627-4577-828a-5bf4036cf408	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 03:29:06.974082	2026-01-26 03:29:06.974082
b8dda5f2-f7c7-4449-bf27-53520a929190	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 03:34:33.41422	2026-01-26 03:34:33.41422
02e96d78-15be-44ac-bc29-eed43e2e2f38	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 03:34:33.41422	2026-01-26 03:34:33.41422
6586c60d-92df-4eff-bd03-1129b8a29f4f	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 03:34:33.41422	2026-01-26 03:34:33.41422
04c571ca-c47d-4fbf-a2fe-42b7bcc1fc76	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 03:34:33.41422	2026-01-26 03:34:33.41422
8bd75427-763c-4206-b079-6fb44546af2f	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 03:34:33.41422	2026-01-26 03:34:33.41422
8d246438-e86f-4db7-9ec8-f17b81a5805c	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 03:43:57.8113	2026-01-26 03:43:57.8113
97cd30f1-26cf-45a6-a72d-093f11b3190a	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 03:43:57.8113	2026-01-26 03:43:57.8113
3b6196c4-c9fc-4c77-b145-28ea9af4e340	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 03:43:57.8113	2026-01-26 03:43:57.8113
f1afd399-9184-4202-b051-24521437ba82	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 03:43:57.8113	2026-01-26 03:43:57.8113
392fb529-bc2e-49e2-8831-ee683aafce90	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 03:43:57.8113	2026-01-26 03:43:57.8113
ba4a250a-6b00-43aa-a2e3-8d1c6f6cff7f	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 03:44:21.237045	2026-01-26 03:44:21.237045
d8a602db-02e7-4455-9e4f-a42a377d9be1	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 03:44:21.237045	2026-01-26 03:44:21.237045
f1ce223b-252e-4727-b726-1afd1489eafa	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 03:44:21.237045	2026-01-26 03:44:21.237045
66973704-b795-4d10-9b65-8468bc7c3422	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 03:44:21.237045	2026-01-26 03:44:21.237045
ee41c8c1-703a-4413-a03f-3d5f2f6f9836	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 03:44:21.237045	2026-01-26 03:44:21.237045
619b51c0-5d47-497e-8c53-2b0ca722bfd6	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-26 14:26:01.595268	2026-01-26 14:26:01.595268
eef05c66-b206-46a3-a5a3-c64531717648	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-26 14:26:01.595268	2026-01-26 14:26:01.595268
32c6d9e8-0ccc-4d27-ad94-9c31d155a8f6	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-26 14:26:01.595268	2026-01-26 14:26:01.595268
36a7078c-3ee4-4058-b876-da1bfb429595	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-26 14:26:01.595268	2026-01-26 14:26:01.595268
e57a8582-3cb4-4f1b-b1f7-a61410ec296f	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-26 14:26:01.595268	2026-01-26 14:26:01.595268
103f7412-bd49-4f4b-bd4c-c7da2d1e5f8c	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-27 14:26:51.954139	2026-01-27 14:26:51.954139
ef86bdb0-b9b3-42e8-8be6-bd66f1f1cb21	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-27 14:26:51.954139	2026-01-27 14:26:51.954139
223f9582-36a5-4b5c-8f54-48a735ce46f8	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-27 14:26:51.954139	2026-01-27 14:26:51.954139
d196d589-a36e-46d1-b14c-2d5c51298465	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-27 14:26:51.954139	2026-01-27 14:26:51.954139
8e76f85e-bba7-4658-a958-9c158d43c9b3	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-27 14:26:51.954139	2026-01-27 14:26:51.954139
db72742d-a5b6-4d63-8db2-a093d9153439	test-admin-123	Zambia's Copper Industry Sees Record Growth in 2025	zambia-copper-industry-record-growth-2025	The Zambian copper sector reported unprecedented production levels this quarter, signaling strong economic recovery and increased foreign investment in the mining industry.	The Zambian copper industry has achieved remarkable milestones in the first quarter of 2025, with production reaching an all-time high of 250,000 metric tons. This represents a 15% increase compared to the same period last year.\n\nIndustry analysts attribute this growth to several key factors:\n\n**Increased Foreign Investment**\nMajor international mining companies have renewed their commitment to Zambian operations, investing over $2 billion in infrastructure upgrades and exploration activities. This influx of capital has enabled the modernization of existing facilities and the opening of new mining sites.\n\n**Government Support**\nThe Zambian government's mining-friendly policies, including tax incentives for exploration and streamlined licensing procedures, have created a favorable business environment. The Ministry of Mines has also invested in training programs to develop local talent.\n\n**Global Demand**\nRising global demand for copper, particularly for renewable energy infrastructure and electric vehicles, has driven prices to multi-year highs. Zambian copper is highly sought after due to its quality and ethical sourcing standards.\n\n**Technological Advancements**\nModern mining techniques and automation have increased efficiency while reducing environmental impact. Several mines have implemented AI-powered systems for ore detection and processing optimization.\n\nLooking ahead, industry experts predict sustained growth, with production expected to reach 1.2 million metric tons by year-end.	\N	Industry News	t	2026-01-27 14:42:36.800829	2026-01-27 14:42:36.800829
236599f6-bdc8-4014-b381-6814af82e889	test-admin-123	Emerald Mining: Zambia's Hidden Gem	emerald-mining-zambia-hidden-gem	Beyond copper, Zambia's emerald deposits are gaining international recognition for their exceptional quality, attracting luxury jewelry brands and investors worldwide.	While copper dominates headlines, Zambia's emerald mining sector is quietly making waves in the global gemstone market. The country produces some of the world's finest emeralds, rivaling traditional sources like Colombia.\n\n**Why Zambian Emeralds Stand Out**\n\nZambian emeralds are prized for their deep green color and exceptional clarity. Unlike emeralds from other regions, Zambian stones have higher iron content and lower chromium, resulting in a distinctive bluish-green hue that's highly valued by collectors.\n\n**Major Production Sites**\n\nThe Kagem emerald mine, located in the Copperbelt Province, is the world's largest single producer of emeralds. The mine operates with state-of-the-art equipment and employs over 1,000 workers, contributing significantly to local employment.\n\n**Sustainable Mining Practices**\n\nLeading emerald producers in Zambia have committed to responsible mining practices, including:\n- Environmental rehabilitation programs\n- Fair labor standards and community development\n- Transparent supply chains to prevent conflict minerals\n- Investment in local education and healthcare\n\n**Market Growth**\n\nThe global emerald market is projected to grow at 8% annually, with Zambian emeralds commanding premium prices. Major luxury brands have established direct relationships with Zambian mines to secure supply of high-quality stones.\n\n**Investment Opportunities**\n\nFor investors, the emerald sector offers unique opportunities. Unlike copper, which is subject to commodity price fluctuations, fine emeralds appreciate over time, making them an attractive alternative investment.	\N	Market Analysis	t	2026-01-27 14:42:36.800829	2026-01-27 14:42:36.800829
5fb08d82-8ab3-443a-9984-7c9dac193d39	test-admin-123	Sustainable Mining Practices Transform Zambian Industry	sustainable-mining-practices-zambia	Zambian mining companies are leading Africa in adopting green technologies and sustainable practices, setting new standards for responsible resource extraction.	The mining industry in Zambia is undergoing a green revolution, with companies investing heavily in sustainable technologies and environmental protection measures.\n\n**Key Sustainability Initiatives**\n\n1. **Renewable Energy Integration**: Several major mines now operate on 30-50% renewable energy, primarily solar and hydroelectric power.\n\n2. **Water Conservation**: Advanced water recycling systems have reduced freshwater consumption by up to 40% at major facilities.\n\n3. **Biodiversity Protection**: Mining companies have established conservation areas totaling over 50,000 hectares to protect local wildlife.\n\n4. **Community Engagement**: Transparent stakeholder engagement processes ensure local communities benefit from mining activities through employment, infrastructure, and social programs.\n\n**Economic and Environmental Benefits**\n\nThese sustainability measures aren't just good for the environment—they're good for business. Companies report:\n- 25% reduction in operating costs through energy efficiency\n- Improved relations with local communities\n- Enhanced international reputation and access to ESG-focused investment\n- Reduced regulatory risks and compliance costs\n\n**The Road Ahead**\n\nThe Zambian government has announced plans to make environmental compliance mandatory for all new mining licenses, positioning the country as Africa's leader in sustainable resource extraction.	\N	Sustainability	t	2026-01-27 14:42:36.800829	2026-01-27 14:42:36.800829
b557a7f5-472a-4ed7-8cdc-46cccb2da5f3	test-admin-123	Investment Guide: Navigating Zambia's Mining Sector	investment-guide-zambia-mining-sector	A comprehensive overview of investment opportunities, legal requirements, and best practices for foreign investors entering Zambia's thriving mining industry.	Zambia presents compelling investment opportunities in the mining sector, but success requires understanding the regulatory landscape and market dynamics.\n\n**Legal Framework**\n\nZambia's mining sector operates under the Mines and Minerals Development Act, which provides clear guidelines for:\n- Mining rights and licenses\n- Environmental obligations\n- Tax structure and royalties\n- Employment requirements\n- Repatriation of profits\n\n**Types of Mining Licenses**\n\n1. **Exploration License**: Valid for 4 years, renewable\n2. **Mining License**: Valid for 25 years, renewable\n3. **Processing License**: For mineral processing facilities\n4. **Artisanal License**: For small-scale operations\n\n**Investment Incentives**\n\nThe government offers several incentives:\n- Capital allowances on equipment and infrastructure\n- Reduced corporate tax rates for the first 5 years\n- Exemption from import duties on mining equipment\n- Access to specially designated mining zones with enhanced infrastructure\n\n**Due Diligence Checklist**\n\nBefore investing, conduct thorough due diligence:\n- Geological surveys and resource assessments\n- Environmental impact studies\n- Title searches and license verification\n- Community stakeholder consultations\n- Infrastructure and logistics evaluation\n- Market analysis for target minerals\n\n**Success Factors**\n\nSuccessful investors typically:\n- Partner with experienced local operators\n- Invest in community development\n- Adopt international best practices\n- Maintain transparent operations\n- Plan for long-term sustainability\n\nFor personalized investment guidance, contact Fusion Mining Limited's advisory team.	\N	Investment Guide	t	2026-01-27 14:42:36.800829	2026-01-27 14:42:36.800829
0a772608-0feb-472c-8af3-fbbbea02a6c7	test-admin-123	Technology Revolutionizes Zambian Mining Operations	technology-revolutionizes-zambian-mining	From AI-powered exploration to automated processing, cutting-edge technology is transforming how Zambia extracts and processes its mineral wealth.	The integration of advanced technology is revolutionizing Zambia's mining sector, improving efficiency, safety, and environmental outcomes.\n\n**AI and Machine Learning**\n\nMining companies are deploying AI systems for:\n- Predictive maintenance reducing equipment downtime by 30%\n- Ore grade detection and sorting optimization\n- Real-time safety monitoring and hazard detection\n- Resource estimation and exploration targeting\n\n**Automation and Robotics**\n\nAutomated systems now handle:\n- Drilling and blasting operations\n- Ore transportation and processing\n- Quality control and sampling\n- Environmental monitoring\n\n**Drone Technology**\n\nUnmanned aerial vehicles (UAVs) are used for:\n- Topographical mapping and surveying\n- Infrastructure inspection\n- Environmental compliance monitoring\n- Security surveillance\n\n**Digital Twins**\n\nSeveral major operations have created digital replicas of their entire mining processes, enabling:\n- Scenario planning and optimization\n- Training simulations for operators\n- Predictive modeling of equipment performance\n- Real-time operations monitoring\n\n**Blockchain for Traceability**\n\nZambian mines are pioneering blockchain-based supply chain tracking, ensuring:\n- Conflict-free mineral certification\n- Transparency for ESG investors\n- Premium pricing for ethically sourced materials\n- Reduced fraud and smuggling\n\n**Skills Development**\n\nThis technological transformation requires new skills. Mining companies are partnering with universities to develop training programs in:\n- Data analytics and AI\n- Robotics and automation\n- Digital systems management\n- Cybersecurity\n\nThe tech revolution positions Zambia as Africa's most advanced mining destination.	\N	Technology	t	2026-01-27 14:42:36.800829	2026-01-27 14:42:36.800829
\.


--
-- Data for Name: buyer_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buyer_requests (id, buyer_id, title, description, mineral_type, quantity, budget, location, status, created_at, updated_at, item_id, main_category, mineral_subcategory, tool_subcategory, service_subcategory, ppe_subcategory, specific_type, country, verified, expiry_date) FROM stdin;
524f26e9-098f-4c2a-b505-3604813d2d47	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-10-23 13:09:28.894742	2025-10-23 13:09:28.894742	TXE7H	\N	\N	\N	\N	\N	\N	\N	f	\N
9cba5a56-c842-4cc4-a33a-3db628c9e6cb	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-10-23 13:09:28.894742	2025-10-23 13:09:28.894742	8X85R	\N	\N	\N	\N	\N	\N	\N	f	\N
6cca4abd-91df-4031-9cc5-73fd81733677	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-10-23 13:09:28.894742	2025-10-23 13:09:28.894742	BSUUQ	\N	\N	\N	\N	\N	\N	\N	f	\N
477c24de-603d-4736-b84b-53e60b1b7c02	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-10-23 14:24:13.554523	2025-10-23 14:24:13.554523	ZUH5Y	\N	\N	\N	\N	\N	\N	\N	f	\N
b34caccb-9fcd-44b0-9397-021433f3bdc5	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-10-23 14:24:13.554523	2025-10-23 14:24:13.554523	EUSJ6	\N	\N	\N	\N	\N	\N	\N	f	\N
54928038-c4a9-447b-9cf2-f78d5239b3c8	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-10-23 14:24:13.554523	2025-10-23 14:24:13.554523	7WMST	\N	\N	\N	\N	\N	\N	\N	f	\N
d24f6044-66a5-423c-a152-15f585a834cb	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-10-23 14:38:31.544951	2025-10-23 14:38:31.544951	BCRX9	\N	\N	\N	\N	\N	\N	\N	f	\N
5ddcecaf-39e5-41a8-b7ee-3d7310b6a3d7	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-10-23 14:38:31.544951	2025-10-23 14:38:31.544951	X6ESY	\N	\N	\N	\N	\N	\N	\N	f	\N
886135d8-4a51-40a7-a823-f432ea3680ff	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-10-23 14:38:31.544951	2025-10-23 14:38:31.544951	SQ8DL	\N	\N	\N	\N	\N	\N	\N	f	\N
d63eba5c-a4d3-4c3f-a2b5-40472f2f8134	test-buyer-789	Seeking Regular Copper Ore Supply	Looking for 10,000+ tonnes monthly with consistent quality.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-11-03 12:28:35.270367	2025-11-03 12:28:35.270367	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
8dda756c-ea82-4cbc-a04c-1c7bb4b0bf87	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt	active	2025-11-03 12:28:35.270367	2025-11-03 12:28:35.270367	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
bde73403-31d5-49bf-a6bc-7d4fee96b8fb	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-11-03 12:28:51.630875	2025-11-03 12:28:51.630875	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
ec797243-5bb3-4e04-92d6-7b38a002aa5a	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-11-03 12:28:51.630875	2025-11-03 12:28:51.630875	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
deaaf5c0-e8ec-4d71-bc1d-601277c388b2	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-11-03 12:28:51.630875	2025-11-03 12:28:51.630875	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
a165af02-4978-4a3e-a2f0-985f0a0d664d	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-11-03 12:34:24.110492	2025-11-03 12:34:24.110492	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
93fa6ac3-19cb-4a51-8bbd-c7697c288c28	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-11-03 12:34:24.110492	2025-11-03 12:34:24.110492	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
ec5a7646-fcf6-4229-85e6-756b60697fba	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-11-03 12:34:24.110492	2025-11-03 12:34:24.110492	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
5a31354c-55bb-4a87-9f86-bd417e4f7a35	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-11-03 13:33:44.08814	2025-11-03 13:33:44.08814	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
d6b15fa1-fc6c-4f35-aecf-1c0d659b5da8	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-11-03 13:33:44.08814	2025-11-03 13:33:44.08814	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
90aa6539-f51b-4f35-99e4-7ade7f218f30	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-11-03 13:33:44.08814	2025-11-03 13:33:44.08814	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
e78262a5-762b-48a7-b753-79818869b057	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-12-08 11:35:38.332128	2025-12-08 11:35:38.332128	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
5ca7eb5f-d8b3-42d9-9b63-cbc3a6d16bee	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-12-08 11:35:38.332128	2025-12-08 11:35:38.332128	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
d62dea7c-65e9-41b9-aa10-99a552b4002c	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-12-08 11:35:38.332128	2025-12-08 11:35:38.332128	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
10019ebc-6da7-447d-8098-32783695fef2	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2025-12-08 13:12:27.295425	2025-12-08 13:12:27.295425	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
55c02298-a243-4888-8d60-4b7ad9624b33	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2025-12-08 13:12:27.295425	2025-12-08 13:12:27.295425	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
b7b63b48-b50d-4370-b286-89cfe39e9cd1	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2025-12-08 13:12:27.295425	2025-12-08 13:12:27.295425	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
a199b0c0-1427-4781-93ec-2dfc4a00ea50	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-24 12:27:54.347114	2026-01-24 12:27:54.347114	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
c91c116c-2dcc-48dd-96f9-f938cd92dd3f	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-24 12:27:54.347114	2026-01-24 12:27:54.347114	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
88836c10-b265-4520-97b7-2230714151d7	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-24 12:27:54.347114	2026-01-24 12:27:54.347114	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
0d6d52bb-2dbe-4335-a1c0-db68d5920b3e	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-25 23:21:09.943287	2026-01-25 23:21:09.943287	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
1eb6516e-2834-4c87-b2e6-d23be180e8e3	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-25 23:21:09.943287	2026-01-25 23:21:09.943287	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
7e9e7461-9b18-4faa-8b1c-1b01755dc237	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-25 23:21:09.943287	2026-01-25 23:21:09.943287	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
041d6f6b-b8ef-4aa0-a618-53360ce59114	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 01:07:46.312017	2026-01-26 01:07:46.312017	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
b1e1b139-f5f9-4a7c-b3b4-1428894bec65	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 01:07:46.312017	2026-01-26 01:07:46.312017	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
c453ef3c-c5c3-4d86-89dc-6f33623219d0	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 01:07:46.312017	2026-01-26 01:07:46.312017	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
919efec8-b822-4a7e-83d5-e96788419cdd	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 01:31:56.915339	2026-01-26 01:31:56.915339	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
6f796ea3-ff16-4439-9204-79f2d7ff6d21	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 01:31:56.915339	2026-01-26 01:31:56.915339	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
d6f6ddcf-c2d5-4834-8415-b97926fefcf3	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 01:31:56.915339	2026-01-26 01:31:56.915339	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
750912c7-21c1-40aa-8dba-b6e460ddd7a8	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 01:33:45.627407	2026-01-26 01:33:45.627407	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
a2cea12f-2c66-4823-b377-56b711db2e73	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 01:33:45.627407	2026-01-26 01:33:45.627407	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
2da835e1-a429-4cfd-8884-61f8c7a5d4be	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 01:33:45.627407	2026-01-26 01:33:45.627407	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
c84111e1-a67f-439a-bc8b-979bdb18b91e	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 03:29:06.969176	2026-01-26 03:29:06.969176	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
fd1f41b8-c396-4499-a0ac-2c5a5869f02f	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 03:29:06.969176	2026-01-26 03:29:06.969176	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
66c02934-a9ab-423a-988a-d9ff921e6d91	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 03:29:06.969176	2026-01-26 03:29:06.969176	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
20d3e3ef-c3d6-4035-b982-d9f7cb36c908	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 03:34:33.409599	2026-01-26 03:34:33.409599	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
6aa09ef5-a8c0-49dc-acdc-a31dce593a14	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 03:34:33.409599	2026-01-26 03:34:33.409599	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
0ede7f49-7fd0-4214-b323-e8690e1d8419	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 03:34:33.409599	2026-01-26 03:34:33.409599	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
568403c6-4b2f-48ed-b541-d3fa98442144	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 03:43:57.806743	2026-01-26 03:43:57.806743	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
bc022123-562b-46e9-a459-8adae934a28a	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 03:43:57.806743	2026-01-26 03:43:57.806743	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
6edf5bec-6c5d-44eb-9ed9-718314bc5d24	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 03:43:57.806743	2026-01-26 03:43:57.806743	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
1eec8cec-00f3-450a-9b35-2a46265fc840	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 03:44:21.233327	2026-01-26 03:44:21.233327	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
fc99bfa5-c85c-42d3-8741-a872114d94fc	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 03:44:21.233327	2026-01-26 03:44:21.233327	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
538854b6-600c-43df-badf-6ac8e13740ad	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 03:44:21.233327	2026-01-26 03:44:21.233327	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
f154074a-90a3-45d9-bcd5-96eabc437e03	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-26 14:26:01.586338	2026-01-26 14:26:01.586338	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
5e8610ea-6b26-48d9-95b5-74d1f5894d5e	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-26 14:26:01.586338	2026-01-26 14:26:01.586338	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
98bfa0b2-c629-4942-98a6-b698b2ba6436	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-26 14:26:01.586338	2026-01-26 14:26:01.586338	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
6400f589-f222-452c-bbe2-9baaa0dd5c5d	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-27 14:26:51.950612	2026-01-27 14:26:51.950612	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
2688122e-50c4-4170-93a0-c51993556084	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-27 14:26:51.950612	2026-01-27 14:26:51.950612	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
9ad1c301-20e6-476b-9479-637dbd81c8db	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-27 14:26:51.950612	2026-01-27 14:26:51.950612	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
3fef61f7-50c1-40c4-875b-c2d6aa1bbbc9	test-buyer-789	Seeking Regular Copper Ore Supply	International buyer seeking long-term copper ore supplier. Looking for 10,000+ tonnes monthly with consistent quality. Will provide advance payment for reliable suppliers.	Copper	10,000 tonnes/month	$40-45M annually	Any major mining region	active	2026-01-27 14:42:36.797134	2026-01-27 14:42:36.797134	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
bf2d2cd2-ac90-475c-ba16-4eea713ec094	test-buyer-789	High-Quality Emerald Procurement	Luxury jewelry company seeks premium grade emeralds. Looking for certified stones with excellent clarity and color. Long-term partnership preferred.	Emerald	1,000+ carats quarterly	$5-10M per quarter	Copperbelt preferred	active	2026-01-27 14:42:36.797134	2026-01-27 14:42:36.797134	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
b022a758-e4ff-4461-8b13-5d6f9cb51506	test-buyer-789	Cobalt for Battery Manufacturing	Battery manufacturer requires sustainable cobalt supply chain. Looking for ethically sourced, battery-grade cobalt with full traceability.	Cobalt	5,000 tonnes annually	$150-200M annually	Any region with export capability	active	2026-01-27 14:42:36.797134	2026-01-27 14:42:36.797134	\N	\N	\N	\N	\N	\N	\N	\N	f	\N
\.


--
-- Data for Name: contact_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_settings (id, office_address, phone, email, support_email, monday_friday, saturday, sunday, updated_at) FROM stdin;
default-contact-settings	Shaolin Temple, Ngwerere Road, Office # 1	+260 978 838 939	support@fusionmining.com	support@fusionmining.com	8:00 AM - 5:00 PM	9:00 AM - 1:00 PM	Closed	2026-01-27 14:42:36.804283
\.


--
-- Data for Name: contact_submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_submissions (id, name, email, phone, subject, message, status, created_at) FROM stdin;
172ffd98-6282-46b2-bde2-27a837aa9807	William Banda 	innovareadvi@gmail.com	260978838939	I want to Join and work with you	Hi how can i schedule a meeting and work with you guys	new	2025-12-12 08:55:16.981028
2e9e02a2-38bf-477d-81cd-cbdf23f08b44	Zambia Intercity Express	inchoicash@gmail.com	0970000000	Inquiry about: Konkola Copper Mine	Hello	new	2025-12-12 08:55:59.217217
88545795-bea6-4a81-a1d0-4cc1b25ffb57	tiyende db	xqpacificlarry@gmail.com	260978838933	Inquiry about: Gold	Hello how are you guys doing?\n	new	2025-12-12 09:02:20.389034
f63ed19e-ec09-47e8-b9f5-9dd6a00e8ee2	William Banda 	innovareadvi@gmail.com	260978838935	Inquiry about: Konkola Copper Mine	Hello people	resolved	2025-12-12 09:30:52.559479
f46f38f4-5a8f-4bf6-a559-a6294cd20c10	Test User	test@example.com	+1 555 1111	Test Subject	This is a test from assistant.	contacted	2025-12-12 09:07:53.00344
712fd262-0959-4276-a6f0-64dab5d1ffcb	Ray Muluti	mining@gmail.com	0977621457	Inquiry about: Gold	Trial 123	new	2025-12-12 10:29:19.871982
14db41b7-3e84-42e4-bcda-da71f16687d9	Muti	abshsh@gmail.com	0972337733	Notification Trial	Sound bell trial 1 2	new	2025-12-12 10:43:52.032428
f16f5260-2518-4aef-9d4f-3c0f274cbae3	Ray Pass	ray@fusionmining.com	\N	Njala Kuno	Bwanji ba admin	new	2025-12-12 13:12:20.885987
\.


--
-- Data for Name: document_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.document_templates (id, template_name, document_type, content, variables, version, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: email_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email_templates (id, template_key, subject, body_html, body_text, variables, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: express_interest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.express_interest (id, project_id, user_id, message, created_at, listing_id) FROM stdin;
3401e3f9-c827-43af-859e-63180c9dcdd1	81d1d9d7-ee8d-4b26-8081-e91dd47cc160	test-buyer-789	\N	2025-10-30 12:39:52.635813	\N
a973bf43-ab5e-49b2-a9d8-58d42004ec21	85d163eb-edc5-4a3b-8893-8a34dac15443	test-buyer-789	\N	2025-10-30 13:05:28.978472	\N
eb9d296a-1254-4157-be9d-6ef95f28a259	81d1d9d7-ee8d-4b26-8081-e91dd47cc160	test-admin-123	\N	2025-10-30 14:23:58.391133	\N
a45f4f76-e212-4288-8d06-73d123a9df67	e0682140-380f-427f-a420-8692103240de	test-admin-123	\N	2025-10-30 14:24:01.528237	\N
de1727f0-7204-44fa-9070-97cfd536a913	36d4321b-df17-4094-8677-fd8f5af6595b	test-buyer-789	\N	2025-10-31 11:34:34.16655	\N
c05d8fb8-9b24-4382-bb00-6cde97b3f1db	be92ac88-bd10-4f8d-995a-b2ff1f10854c	test-admin-super	\N	2025-12-08 11:03:55.601905	\N
89317674-2193-4cd8-85eb-4dc96ecbd3bc	1254dd1c-9c2d-4d04-b381-2dc1f4b99797	test-buyer-789	\N	2025-12-12 10:45:43.888736	\N
66f15f73-4bef-455f-be15-475002862e6f	aa4b0660-c009-4ed9-9c2d-9f224d9af255	test-buyer-789	\N	2025-12-12 10:59:26.689454	\N
\.


--
-- Data for Name: login_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_history (id, user_id, ip_address, user_agent, login_success, failure_reason, created_at) FROM stdin;
\.


--
-- Data for Name: marketplace_listings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marketplace_listings (id, seller_id, type, title, description, mineral_type, grade, location, quantity, price, image_url, status, created_at, updated_at, item_id, main_category, mineral_subcategory, tool_subcategory, service_subcategory, ppe_subcategory, specific_type) FROM stdin;
0d5b2843-3ace-473e-afc4-53cc7c8cf7e7	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from Copperbelt. Full documentation available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-11-03 12:28:35.270367	2025-11-03 12:28:35.270367	\N	minerals	\N	\N	\N	\N	\N
e2be26c2-e667-4be3-bd0d-700032c4e2e0	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-11-03 12:28:35.270367	2025-11-03 12:28:35.270367	\N	minerals	\N	\N	\N	\N	\N
49bb1258-8eae-44b2-ba94-d8659d38f67c	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-11-03 12:28:35.270367	2025-11-03 12:28:35.270367	\N	minerals	\N	\N	\N	\N	\N
f5100188-f643-4867-ab15-55734613d578	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-11-03 12:28:35.270367	2025-11-03 12:28:35.270367	\N	minerals	\N	\N	\N	\N	\N
33f1cb7b-3871-4209-bc82-501afe4989cd	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations.		\N	Copperbelt	\N	\N	\N	approved	2025-11-03 12:28:35.270367	2025-11-03 12:28:35.270367	\N	mining_services	\N	\N	\N	\N	\N
69e0e09e-ce49-49b2-a606-bae1fb02ad8b	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-10-23 13:09:28.88826	2025-10-23 13:09:28.88826	2JLU2	mining_services	\N	\N	\N	\N	\N
861eb41d-8fd1-49c4-9220-0f749aa7db94	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-10-23 14:24:13.551396	2025-10-23 14:24:13.551396	QBG2L	mining_services	\N	\N	\N	\N	\N
c9d28e3c-2bf6-4007-a55b-55fa006940b8	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-10-23 13:09:28.88826	2025-10-23 13:09:28.88826	JS35S	mining_services	\N	\N	\N	\N	\N
7831218f-e233-4079-8cf4-3ca83473c146	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-10-23 14:24:13.551396	2025-10-23 14:24:13.551396	9LJ2V	mining_services	\N	\N	\N	\N	\N
d39c7ea3-fe29-4c01-a348-228dcf521d27	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-10-23 14:38:31.540917	2025-10-23 14:38:31.540917	VUDU3	mining_services	\N	\N	\N	\N	\N
c34d9915-23de-45b2-9613-4da3d522f17b	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-10-23 14:38:31.540917	2025-10-23 14:38:31.540917	B3K2H	mining_services	\N	\N	\N	\N	\N
cc8d5fa4-3535-4720-a8bd-b8bfd5f58009	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
83d217cf-c680-4a25-b4ae-8a828f44046e	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
db8ef0cb-b00d-4bd1-a6e4-c554d80e58c6	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_tools	\N	ore_processing	\N	\N	\N
4bb758b8-cca6-4f52-adef-afc6d9bd4bbf	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_services	\N	\N	drilling_blasting	\N	\N
834c198e-0aed-437e-b48d-eaeecf69ace6	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_services	\N	\N	freight_services	\N	\N
033ceb5a-3719-4e73-ae95-c220c9d5a179	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_services	\N	\N	consulting_advisory	\N	\N
84cbfa6f-202e-4119-a5e5-ca4c37d41772	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_services	\N	\N	drilling_blasting	\N	\N
68780446-05d2-4b02-bce9-84d486ca858e	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_services	\N	\N	freight_services	\N	\N
8043d034-7b3b-46ca-85d7-8c222894dd77	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-11-03 12:28:51.626599	2025-11-03 12:28:51.626599	\N	mining_services	\N	\N	\N	\N	\N
d9ce35c1-8bf7-4c75-addf-442a316e0af1	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-11-03 12:28:51.626599	2025-11-03 12:28:51.626599	\N	mining_services	\N	\N	\N	\N	\N
0ec539e3-2ab4-42ce-9adf-b5076c38cf0d	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_services	\N	\N	\N	\N	\N
19358c90-218d-44eb-b7d7-6fc929794c43	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	mining_services	\N	\N	\N	\N	\N
7c3c704a-f80f-4cf2-8f87-98a678436b3f	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_services	\N	\N	\N	\N	\N
eaf8a920-08bf-4c50-a6bc-f05856e9fb98	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_services	\N	\N	\N	\N	\N
89c02d28-2514-47b1-8ff4-2513797fbaac	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_services	\N	\N	consulting_advisory	\N	\N
seed-sv-1	test-seller-456	partnership	Specialist Drilling & Blasting Services	Experienced drilling & blasting crew offering bench-scale and production blasting. Licensed and safety-compliant.	\N	\N	Copperbelt	\N	\N	/attached_assets/files/Services%20and%20Mining%20Equipment/blasting.png	approved	2025-11-03 13:48:46.199425	2025-11-03 13:48:46.199425	SV001	mining_services	\N	\N	drilling_blasting	\N	\N
seed-sv-2	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	\N	/attached_assets/files/Services%20and%20Mining%20Equipment/Shipping.png	approved	2025-11-03 13:48:46.199425	2025-11-03 13:48:46.199425	SV002	mining_services	\N	\N	freight_services	\N	\N
seed-sv-3	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	\N	/attached_assets/files/Services%20and%20Mining%20Equipment/Feasibility.png	approved	2025-11-03 13:48:46.199425	2025-11-03 13:48:46.199425	SV003	mining_services	\N	\N	consulting_advisory	\N	\N
47c5ee1a-d1f9-4ba3-a8d3-4f2b5b31a6fb	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_services	\N	\N	drilling_blasting	\N	\N
4d6ed6b2-04c7-44db-8d32-4292a2318a7c	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_services	\N	\N	freight_services	\N	\N
360bc771-36c1-46c8-8f43-ab41f96e51cd	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_services	\N	\N	consulting_advisory	\N	\N
39bdb71e-303a-4381-9fe3-77e3f04637bc	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_services	\N	\N	drilling_blasting	\N	\N
c8b5a1f2-e176-4d81-98cb-a7ea06b3be86	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_services	\N	\N	freight_services	\N	\N
91b66440-2827-4b58-8f45-cdf23e68635e	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_services	\N	\N	consulting_advisory	\N	\N
cf5a7da1-8740-49e0-b29c-642dbf10829c	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
1c11ca4b-386d-404e-9b4a-4c1646c11c3c	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
b8ea453a-11f9-4886-8404-d0af568258f6	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_services	\N	\N	\N	\N	\N
33f537b4-9e71-47e7-b2ed-6d947d0f4fab	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_services	\N	\N	\N	\N	\N
37bc96bd-72f7-4e8f-9cde-c82323d479b6	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_services	\N	\N	\N	\N	\N
1d03a482-9219-4b7f-8fd6-be37cb0d962d	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_services	\N	\N	\N	\N	\N
77a4ec68-c3c1-44a8-b5c4-a6e27fdb4349	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	mining_tools	\N	ore_processing	\N	\N	\N
seed-eq-1	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Low hours, well maintained. Located in Gauteng. Ready to load.	\N	\N	Solwezi	1 unit	ZAR 3,500,000	/attached_assets/files/Services%20and%20Mining%20Equipment/equipment2.png	approved	2025-11-03 13:48:46.199425	2025-11-03 13:48:46.199425	EQ001	mining_tools	\N	heavy_equipment	\N	\N	\N
seed-eq-2	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	ZAR 1,250,000	/attached_assets/files/Services%20and%20Mining%20Equipment/drilling.png	approved	2025-11-03 13:48:46.199425	2025-11-03 13:48:46.199425	EQ002	mining_tools	\N	drilling_equipment	\N	\N	\N
seed-eq-3	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Portable crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	ZAR 2,200,000	/attached_assets/files/Services%20and%20Mining%20Equipment/equipment.png	pending	2025-11-03 13:48:46.199425	2025-11-03 13:48:46.199425	EQ003	mining_tools	\N	ore_processing	\N	\N	\N
3343ce74-0e1f-44a7-a096-b92c76503fab	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
8c679c68-220a-441e-b517-51cfe696ac5c	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
24337e2b-a628-48dd-8f71-262ed161beeb	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	mining_tools	\N	ore_processing	\N	\N	\N
c02ad518-b0dc-4f6d-a5eb-41323ef1e39c	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
6cb264af-f26c-4b91-af3b-b5e1b9d553b5	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
95a0cadb-6963-4cef-8aee-2167241cb026	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	mining_tools	\N	ore_processing	\N	\N	\N
a27061f3-0ea9-43b0-beb6-3b96b189f9e9	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
e79caa8d-9434-4565-ae95-ef9ecd03aed4	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
97a568ac-a7b6-42a5-991f-95d22681b403	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_tools	\N	ore_processing	\N	\N	\N
8fda6e39-dffb-4012-905e-bebfe82f9a22	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_services	\N	\N	drilling_blasting	\N	\N
99d3ef35-e557-4723-9b06-be6ca0cb65bf	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_services	\N	\N	freight_services	\N	\N
d3f18c81-b794-4d03-b6ed-392891efc6a5	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_services	\N	\N	consulting_advisory	\N	\N
44bd124a-ffcf-44c7-be1b-cf995234e6b6	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_services	\N	\N	\N	\N	\N
fd7322ec-fc05-49a8-aabd-bdecfd32308b	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	mining_services	\N	\N	\N	\N	\N
d42ed58c-45f0-443c-844a-558d88fa02d0	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
8868570f-0985-491a-9d99-40352fad1f21	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
e7170b72-29c4-4ba9-b592-8a3b19e53e55	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_tools	\N	ore_processing	\N	\N	\N
ce2c4732-6392-48b9-89a5-504a96157f9c	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_services	\N	\N	drilling_blasting	\N	\N
ea7558f5-db4d-422c-a125-ecb2b080c097	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_services	\N	\N	freight_services	\N	\N
da618449-cf3a-4491-af2f-b65579389dc9	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_services	\N	\N	consulting_advisory	\N	\N
a1df481e-927c-4b87-9998-b9e2587bcdb0	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
18ad6816-9be6-43ab-baa1-c2733bb06204	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
393f7f15-e0e5-485a-9fcd-4a4c986ca2ba	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_tools	\N	ore_processing	\N	\N	\N
c3436fb2-1aed-4b8b-b4e5-1ce56fccf780	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_services	\N	\N	drilling_blasting	\N	\N
64b17ccd-da04-4b25-b08e-3f7d2efb9378	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_services	\N	\N	freight_services	\N	\N
b44cc91d-7ff3-4125-975c-f8aa009b7941	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_services	\N	\N	consulting_advisory	\N	\N
4d0f67cf-3aee-4079-8350-276fa023edfa	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_services	\N	\N	\N	\N	\N
c85e840a-46ee-4e55-9e6f-6bbe82f60e95	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	mining_services	\N	\N	\N	\N	\N
6437d15b-a2e7-417d-b926-2af5a501f8e9	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_services	\N	\N	\N	\N	\N
9fe4098b-39ab-4864-8638-23962f7f10b9	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	mining_services	\N	\N	\N	\N	\N
247bac4f-6766-4cca-b680-10648c70e325	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
6dc159c4-e118-439c-9212-a298bb0f0330	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
ae6adde1-b51a-40b0-8f0f-b906ed947a03	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_tools	\N	ore_processing	\N	\N	\N
3e63c5b1-0608-4efb-b9f1-a62e0db9b9c0	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_services	\N	\N	drilling_blasting	\N	\N
1648d434-ae7b-4f55-95a3-d0432ccf8d1c	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_services	\N	\N	freight_services	\N	\N
15f2b5ff-a69d-49bf-b1f0-86c93804494b	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_services	\N	\N	consulting_advisory	\N	\N
e24e0dd6-2494-495c-a6d2-9726434503cc	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
ee93e368-9e38-46c3-9c9c-660220a4762e	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
dc849226-9017-484d-9d2b-7e7205e96a50	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_tools	\N	ore_processing	\N	\N	\N
3ecba104-320b-40ab-ab72-e771ea028141	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_services	\N	\N	drilling_blasting	\N	\N
5d84ef9d-c3ea-4700-8214-3d5c64a35778	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_services	\N	\N	freight_services	\N	\N
095a50a6-501b-44a4-8b56-09a5d865e63b	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_services	\N	\N	consulting_advisory	\N	\N
9cec4ac2-9714-4c54-89af-e7c4a6ddb61c	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_services	\N	\N	\N	\N	\N
27820a00-30f1-4d41-8e4d-79025c608052	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	mining_services	\N	\N	\N	\N	\N
af910985-ca15-480a-904d-2ceffaac0ab3	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_services	\N	\N	\N	\N	\N
750e443d-4621-4d80-8da8-6f942b520bbd	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	mining_services	\N	\N	\N	\N	\N
8d350e5c-3445-4371-84f0-3a165322c122	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
2a216c7d-470e-4fc2-a58c-366892812583	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
b6498851-c956-4f1e-8065-872af4a09e6d	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_tools	\N	ore_processing	\N	\N	\N
ae166e73-7c2c-4d11-a97e-c407f109514e	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_services	\N	\N	drilling_blasting	\N	\N
02817f54-dbe1-4bd2-99ee-538719089534	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_services	\N	\N	freight_services	\N	\N
ee9f698a-7449-40e8-8ba2-56b040d85421	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_services	\N	\N	consulting_advisory	\N	\N
fb2e0d29-9080-41cb-9033-65cc9d5ede1b	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
d1a90975-57a8-4a89-9231-5870a661a560	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
fa2a97c8-3db4-4720-b4c4-18cd22208805	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_tools	\N	ore_processing	\N	\N	\N
129d1856-7e16-4810-b93c-e5520df2715f	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_services	\N	\N	drilling_blasting	\N	\N
b2f9f39c-213b-4a0a-bc6c-6d3fe5befe4d	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_services	\N	\N	freight_services	\N	\N
f2f4ffff-f71c-4dd1-8583-058ac36e0203	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_services	\N	\N	consulting_advisory	\N	\N
c3cf43cd-b2ad-460a-a53a-895c4a7a6771	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_services	\N	\N	\N	\N	\N
f049a4a7-cb90-4651-ab26-a6ab7bbdc5a5	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	mining_services	\N	\N	\N	\N	\N
4172bbd3-29bb-48f4-9ed7-e6f7f4f11e19	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_services	\N	\N	\N	\N	\N
78063a7b-8541-4691-85c1-055618caee28	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	mining_services	\N	\N	\N	\N	\N
a541d4b5-58cc-4d51-a599-4db020635b3d	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
40ce30c9-3357-4f55-8e1e-ba49c17a81d3	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
897ee218-261f-45d7-9002-3c08d29681c6	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_tools	\N	ore_processing	\N	\N	\N
293294d0-59d6-4108-a368-00cc644f4c9b	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_services	\N	\N	drilling_blasting	\N	\N
7fe70588-cb26-4231-a709-29100d9ba7a4	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_services	\N	\N	freight_services	\N	\N
8aed7418-fa20-43f7-9fb3-739d26754eaa	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_services	\N	\N	consulting_advisory	\N	\N
e811de55-cd47-4418-a3b8-007b725b8938	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
7fba1d15-0d8e-4da1-94d3-97fb93f67d39	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
2aed9cb6-dfa4-4d16-90c2-ac7b50e829b8	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_tools	\N	ore_processing	\N	\N	\N
337e3eb2-aee4-4f94-92a0-e9158dae7693	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_services	\N	\N	drilling_blasting	\N	\N
11246590-6a97-44cf-8a44-a1389bc6186c	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_services	\N	\N	freight_services	\N	\N
202882e9-26b1-4d36-8fc0-4d99300fa466	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_services	\N	\N	consulting_advisory	\N	\N
bc98bbb0-d9a1-4373-bd2e-4f9be2245b74	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_services	\N	\N	\N	\N	\N
3e346da3-d2e0-477c-ade8-c257f831e66c	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	mining_services	\N	\N	\N	\N	\N
752bf2c5-d30a-4b3b-b1a6-b7e17f31e5fe	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_services	\N	\N	\N	\N	\N
2811d81e-1b8d-49d2-a6e0-73bb029c9f9a	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	mining_services	\N	\N	\N	\N	\N
331c0077-41c0-4d9e-99ae-beac8d3bee1d	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
fe566721-8a67-4592-849c-bae39aa6472a	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
22d83d7b-5621-4695-9171-7a273d5da9cb	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_tools	\N	ore_processing	\N	\N	\N
cf390512-e734-478b-8ac1-46057817c03e	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_services	\N	\N	drilling_blasting	\N	\N
ab7831ca-6178-4ac7-a7ce-18c7026ecbcb	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_services	\N	\N	freight_services	\N	\N
bd3d335f-2cf5-45a4-9672-fabe0840dd5e	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_services	\N	\N	consulting_advisory	\N	\N
5be53078-b189-4b07-9e86-cfd995c57314	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
42a02184-ab94-46c4-b518-b3d7f21a3926	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
18d7891d-80d8-4294-be11-6a100bb8acc9	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_tools	\N	ore_processing	\N	\N	\N
5a19ca68-bede-460b-85e3-f1f1f8c31974	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_services	\N	\N	drilling_blasting	\N	\N
89fb45a3-c500-4234-a0b6-49a0b3d1cacc	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_services	\N	\N	freight_services	\N	\N
c384cbcd-a34f-40ff-b025-f4f5403f4d3c	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_services	\N	\N	consulting_advisory	\N	\N
811390bb-e159-4578-981c-7bc4579a64aa	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_services	\N	\N	\N	\N	\N
1acc7d7e-57aa-46e8-8c21-1e8c2fa6fa93	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	mining_services	\N	\N	\N	\N	\N
13b0c46c-5422-4f05-b6d1-83451736873b	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_services	\N	\N	\N	\N	\N
fe1f5d74-68ea-4d16-81ce-2ae4ed38b083	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	mining_services	\N	\N	\N	\N	\N
3598b584-b7c3-4b17-9a41-b4af1fd7b2d8	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 15:29:25.009	64Z7C	mining_tools	\N	ore_processing	\N	\N	\N
54855e69-9509-4f99-b463-c8882afecf59	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
22db14cd-ea94-42ec-890a-3b03839e561f	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
8fa67305-613b-4fb0-8d71-e55e2180bb6c	test-seller-456	partnership	Mobile Jaw Crusher & Cone Plant	Complete mobile crushing and screening plant for primary and secondary crushing — ideal for onsite processing and tailings remediation.	\N	\N	Kitwe	1 plant	$480,000	\N	pending	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_tools	\N	ore_processing	\N	\N	\N
9a98c3c5-bfcf-4b49-af3f-5f3af67be181	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_services	\N	\N	drilling_blasting	\N	\N
80bd8bbb-7616-4374-a93a-712d2b03301e	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_services	\N	\N	freight_services	\N	\N
4905272a-abb6-4751-884a-de1e22358959	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_services	\N	\N	consulting_advisory	\N	\N
6b395df8-f5ae-41f6-94bd-4d43bc5f46c9	test-seller-456	partnership	CAT 793F Haul Truck - Excellent Condition	Well-maintained CAT 793F haul truck, low hours, full service history, ideal for large open-pit operations. Delivery and inspection available.	\N	\N	Solwezi	1 unit	$1,200,000	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	mining_tools	\N	heavy_equipment	\N	\N	\N
5f86e644-09d3-4694-a981-07d6bd3ec727	test-seller-456	partnership	Exploration Drill Rig - Atlas Copco	Portable exploration diamond drill rig suitable for core sampling and infill drilling. Comes with spare parts and operator training package.	\N	\N	Ndola	2 units	$220,000 each	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	mining_tools	\N	drilling_equipment	\N	\N	\N
674c9e4e-f994-4a30-afe1-891d6ee5a6ee	test-seller-456	partnership	Specialist Drilling & Blasting Services	Full drilling and blasting service for open pit and underground operations — safely managed, explosives licensing and blast design included.	\N	\N	Copperbelt	\N	Contact for quote	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	mining_services	\N	\N	drilling_blasting	\N	\N
f93cce3a-aa68-4b78-af15-29601f951381	test-seller-456	partnership	Bulk Mineral Freight & Logistics	End-to-end logistics for bulk minerals: rail coordination, port handling, export documentation and customs facilitation across southern Africa.	\N	\N	Lusaka	\N	Contact for quote	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	mining_services	\N	\N	freight_services	\N	\N
e34e27fe-da3e-4e4f-9874-047a55fc9fd9	test-seller-456	partnership	Mining Feasibility & Technical Advisory	Feasibility studies, resource modelling, metallurgy advisory and permitting support from an experienced technical team.	\N	\N	Lusaka	\N	$50,000+ (project dependent)	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	mining_services	\N	\N	consulting_advisory	\N	\N
630320c8-7d5b-407b-b8a0-2f8679f049c3	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-10-23 13:09:28.88826	2025-10-23 13:09:28.88826	UTYRA	minerals	\N	\N	\N	\N	\N
14e575e7-fea8-4a34-a463-71108eec6568	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-10-23 13:09:28.88826	2025-10-23 13:09:28.88826	UQK3E	minerals	\N	\N	\N	\N	\N
0c25f114-a8e1-4bfe-9e33-c36e7b0ef380	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_services	\N	\N	\N	\N	\N
e9e4f4ad-7cc4-49ca-9ecb-8f1268a2a023	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	mining_services	\N	\N	\N	\N	\N
04a3cd9f-1a38-4505-abe6-778f54159a0a	test-seller-456	partnership	Joint Venture - Copper Mine Expansion	Seeking strategic partner for expanding existing copper mining operations. Proven reserves, established infrastructure, and experienced team in place.	\N	\N	Copperbelt	\N	\N	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	mining_services	\N	\N	\N	\N	\N
ee48ea14-7a8f-4703-830c-21a04f726da5	test-seller-456	partnership	Emerald Processing Facility Partnership	Looking for technology and investment partner to establish state-of-the-art emerald cutting and processing facility in Zambia.	\N	\N	Lusaka	\N	\N	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	mining_services	\N	\N	\N	\N	\N
5b8850c5-83f0-4773-b33e-7d4564356b48	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-10-23 13:09:28.88826	2025-10-23 13:09:28.88826	Q9TVT	minerals	\N	\N	\N	\N	\N
6ceaa6fc-6ac8-4151-b0a6-f3e82e46527d	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-10-23 13:09:28.88826	2025-10-23 13:09:28.88826	ACKLP	minerals	\N	\N	\N	\N	\N
7d8da80f-76ef-4ba3-9054-da09b3416e5a	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-10-23 14:24:13.551396	2025-10-23 14:24:13.551396	AWBNX	minerals	\N	\N	\N	\N	\N
a673e8ac-a2d6-46f9-87ef-0acff35db438	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-10-23 14:24:13.551396	2025-10-23 14:24:13.551396	34CEB	minerals	\N	\N	\N	\N	\N
49384469-1752-41db-b88f-ec8980a954f4	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-10-23 14:24:13.551396	2025-10-23 14:24:13.551396	7B5SB	minerals	\N	\N	\N	\N	\N
b89a19f9-89af-490e-82ef-403509094d53	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-10-23 14:24:13.551396	2025-10-23 14:24:13.551396	JDNZ5	minerals	\N	\N	\N	\N	\N
c154fb1b-1dd8-4685-b349-681ce0d766a3	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-10-23 14:38:31.540917	2025-10-23 14:38:31.540917	EC67V	minerals	\N	\N	\N	\N	\N
68e17e58-3b9a-44cb-81fa-1a2021a48c8b	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-10-23 14:38:31.540917	2025-10-23 14:38:31.540917	ZKQ4U	minerals	\N	\N	\N	\N	\N
6bce1594-2ae4-4937-9750-e2acd496f0fb	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-10-23 14:38:31.540917	2025-10-23 14:38:31.540917	DB7R9	minerals	\N	\N	\N	\N	\N
cb7b95d1-0e0a-427d-9958-16e067afc746	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-10-23 14:38:31.540917	2025-10-23 14:38:31.540917	8438S	minerals	\N	\N	\N	\N	\N
d4e5b946-56d5-4f52-b716-ddfbffe53fb1	test-seller-456	mineral	Copper	Mineral	Copper	10%	Lusaka Zambia	1000 Tonnes	$5000 Tonne	icon:Gem	approved	2025-10-30 12:47:44.393768	2025-10-30 10:48:25.448	RKZR2	minerals	\N	\N	\N	\N	\N
0de12802-ee59-4d05-8e3d-440dab8dfbfa	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-11-03 12:28:51.626599	2025-11-03 12:28:51.626599	\N	minerals	\N	\N	\N	\N	\N
b1e3a221-d950-4577-b4ec-9cc3cb6955b8	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-11-03 12:28:51.626599	2025-11-03 12:28:51.626599	\N	minerals	\N	\N	\N	\N	\N
be14b918-1432-4a76-aa16-229d14c32245	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-11-03 12:28:51.626599	2025-11-03 12:28:51.626599	\N	minerals	\N	\N	\N	\N	\N
ef592904-c71e-426e-a1d6-20f5077383f6	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-11-03 12:28:51.626599	2025-11-03 12:28:51.626599	\N	minerals	\N	\N	\N	\N	\N
98656159-6f49-4268-a3c2-e7a9b2d0826e	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	minerals	\N	\N	\N	\N	\N
498003ab-9811-493f-b283-bd71c036febd	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	minerals	\N	\N	\N	\N	\N
ecf26aad-1dba-4d9a-96f4-14ccddd56a97	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	minerals	\N	\N	\N	\N	\N
7d09a576-3e31-4177-be42-7369afdb4d66	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-11-03 12:34:24.105896	2025-11-03 12:34:24.105896	\N	minerals	\N	\N	\N	\N	\N
8dc38131-3599-4049-9da9-cafd6955de7a	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	minerals	\N	\N	\N	\N	\N
0b3f3971-5956-4538-957c-138f7b8984ca	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	minerals	\N	\N	\N	\N	\N
035c696d-8abc-44aa-9306-585d93ca009d	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	minerals	\N	\N	\N	\N	\N
0df92681-cd05-43bc-8300-a946fcc51739	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-11-03 13:33:44.083768	2025-11-03 13:33:44.083768	\N	minerals	\N	\N	\N	\N	\N
c3ec5bd8-2045-423e-8229-fe4342089664	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	minerals	\N	\N	\N	\N	\N
4f0e1075-984f-49f5-88f3-9779e47fec96	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	minerals	\N	\N	\N	\N	\N
ec0a1768-ca27-4f51-b7c2-513c9a87b2d1	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	minerals	\N	\N	\N	\N	\N
bf9540bc-51dc-4c86-9929-f9ba17bbe2f9	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	minerals	\N	\N	\N	\N	\N
34f64125-0561-4472-b16a-ec7ab8569886	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-12-08 11:35:38.326522	2025-12-08 11:35:38.326522	\N	minerals	\N	\N	\N	\N	\N
b5cc6850-0624-41a0-9da3-eafab14febba	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	minerals	\N	\N	\N	\N	\N
9a43f087-80c0-4caf-bd28-8eab59f1de68	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	minerals	\N	\N	\N	\N	\N
51e52a8a-e2e7-492a-8825-8d165f0a494e	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2025-12-08 13:12:27.289453	2025-12-08 13:12:27.289453	\N	minerals	\N	\N	\N	\N	\N
c260047d-6739-4d38-a1c8-9a850360e581	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2025-12-08 13:12:27.289453	2025-12-08 15:44:42.461	\N	minerals	\N	\N	\N	\N	\N
b0063350-a563-4fef-9b9a-a104e4b5bef7	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	minerals	\N	\N	\N	\N	\N
f172b201-d791-40c6-a6f5-7f07ed7ce015	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	minerals	\N	\N	\N	\N	\N
d0a4b847-16cd-4aed-ba23-9bb462c60d7b	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	minerals	\N	\N	\N	\N	\N
400690eb-baea-4941-b7b1-7ac40c3230d8	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-24 12:27:54.340986	2026-01-24 12:27:54.340986	\N	minerals	\N	\N	\N	\N	\N
d323a06e-1cd4-4061-b80d-223803c63f82	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	minerals	\N	\N	\N	\N	\N
e6240023-0dd5-48a5-a8e5-2bdbf85b867e	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	minerals	\N	\N	\N	\N	\N
29e1adde-9830-43ea-87be-59ad0829211c	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	minerals	\N	\N	\N	\N	\N
9d78ed87-0f6a-42e2-8c84-f03c54f37626	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-25 23:21:09.936662	2026-01-25 23:21:09.936662	\N	minerals	\N	\N	\N	\N	\N
5f260f81-25ec-4473-adae-7d8a3f170342	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	minerals	\N	\N	\N	\N	\N
483293d0-4edd-4ea4-9bfb-4c98049583fd	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	minerals	\N	\N	\N	\N	\N
d9cfe767-618a-4ed6-a200-2c9731c54c28	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	minerals	\N	\N	\N	\N	\N
c1baff5b-ef6e-4b9c-9d37-2b80acb7c0d3	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 01:07:46.307422	2026-01-26 01:07:46.307422	\N	minerals	\N	\N	\N	\N	\N
5c55fbb3-06b3-4a73-aa59-2114075a1cfd	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	minerals	\N	\N	\N	\N	\N
79591b32-e5d5-4c6f-8377-227457c1c8f9	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	minerals	\N	\N	\N	\N	\N
2d0d7e6c-06fc-41dc-9b3d-a1db09c0375c	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 01:31:56.909098	2026-01-26 01:31:56.909098	\N	minerals	\N	\N	\N	\N	\N
dbc906c6-6b94-40ec-a998-46c6452a874b	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	minerals	\N	\N	\N	\N	\N
42e2cc75-efd5-4a65-9ef3-e65ad8eab8fa	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	minerals	\N	\N	\N	\N	\N
5d43af32-8619-445b-90b0-1ad526229743	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	minerals	\N	\N	\N	\N	\N
dad0d244-62ac-4a0e-8b47-82703ae03dda	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 01:33:45.622906	2026-01-26 01:33:45.622906	\N	minerals	\N	\N	\N	\N	\N
2d9f79a4-8712-4ec7-886d-24aea9ec39f9	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	minerals	\N	\N	\N	\N	\N
f9a482df-ea5f-4b13-b45b-b19bec61d1da	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	minerals	\N	\N	\N	\N	\N
95632661-da64-47a4-b8e6-7b5f0b99bce7	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	minerals	\N	\N	\N	\N	\N
42d787e5-9f5b-4906-a158-649e1c8125e6	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 03:29:06.962019	2026-01-26 03:29:06.962019	\N	minerals	\N	\N	\N	\N	\N
3c02e7c9-08dd-4fda-a10a-8b23aeed89d7	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	minerals	\N	\N	\N	\N	\N
8667f991-79b1-4856-980a-1dae3f78a9a1	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	minerals	\N	\N	\N	\N	\N
079fb2cc-c0e5-4659-8c0b-b4d722d1127c	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	minerals	\N	\N	\N	\N	\N
1cb956fb-37e7-43d4-807f-e1f8b0922225	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 03:34:33.40309	2026-01-26 03:34:33.40309	\N	minerals	\N	\N	\N	\N	\N
26502383-3d40-4d22-810a-8f227d0064e9	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	minerals	\N	\N	\N	\N	\N
19334cb6-a046-42d3-b2e6-bdf957982376	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	minerals	\N	\N	\N	\N	\N
99b00ea9-614a-472c-8809-b0cae021a731	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	minerals	\N	\N	\N	\N	\N
686d57c3-8c07-4fdb-8d14-f2dcc1d001b8	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 03:43:57.799894	2026-01-26 03:43:57.799894	\N	minerals	\N	\N	\N	\N	\N
e2cb2a98-6b96-4f0e-9c13-066fe77f8b4d	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	minerals	\N	\N	\N	\N	\N
592b7525-248a-4f7d-bd12-c1dac01a4407	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	minerals	\N	\N	\N	\N	\N
4ba14340-cc95-4b8c-9479-7fc775c64b38	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	minerals	\N	\N	\N	\N	\N
602573e8-f7f0-49be-b94b-2e55890015cf	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 03:44:21.228725	2026-01-26 03:44:21.228725	\N	minerals	\N	\N	\N	\N	\N
b0aa01fb-3f8a-4be7-826d-5bb9a4c6d3af	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	minerals	\N	\N	\N	\N	\N
a29c1b05-e5dc-4bc6-b6b1-18c98949ec26	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	minerals	\N	\N	\N	\N	\N
0b032a9a-edf9-4318-b235-10504357335e	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	minerals	\N	\N	\N	\N	\N
640dd415-378a-4fd2-b75e-d670d3da565a	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-26 14:26:01.575249	2026-01-26 14:26:01.575249	\N	minerals	\N	\N	\N	\N	\N
06d8d42e-b344-4d15-879d-71f895ee3c3c	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	minerals	\N	\N	\N	\N	\N
c1202340-b1c6-4947-b95a-37cb2b73638e	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	minerals	\N	\N	\N	\N	\N
df6b837c-0d0f-4d52-b3b4-a069eaebb90e	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	minerals	\N	\N	\N	\N	\N
8840004a-9f8b-4886-ad46-a73ae8136b07	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-27 14:26:51.945574	2026-01-27 14:26:51.945574	\N	minerals	\N	\N	\N	\N	\N
08670be4-59a5-43a9-b7b0-f8b3267f1771	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	minerals	\N	\N	\N	\N	\N
e033a0a2-dfda-454a-a942-f4fb7e2308cf	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	minerals	\N	\N	\N	\N	\N
f9a130c5-fdc2-4154-a092-341324ce4b6b	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	minerals	\N	\N	\N	\N	\N
63c8e67b-b453-4ec6-a36b-ea7064202be0	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	pending	2026-01-27 14:42:00.090104	2026-01-27 14:42:00.090104	\N	minerals	\N	\N	\N	\N	\N
c4566c50-1b31-4b4a-9aa0-cef9afe74ee4	test-seller-456	mineral	High-Grade Copper Ore - 5000 Tonnes	Premium quality copper ore from our Copperbelt operations. Consistent grade, ready for immediate shipment. Full documentation and certificates available.	Copper	25% Cu content	Kitwe, Copperbelt	5,000 tonnes	$4,500/tonne	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	minerals	\N	\N	\N	\N	\N
35cdeeeb-e882-430c-8d31-ed1b400f3478	test-seller-456	mineral	Premium Zambian Emeralds - Investment Grade	Exceptional quality emeralds suitable for jewelry and investment. Sourced from certified mines with full traceability.	Emerald	AAA Grade	Ndola, Copperbelt	500 carats	$8,000/carat	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	minerals	\N	\N	\N	\N	\N
dbcf0729-33a0-40a8-bd07-9fe9e2af360b	test-seller-456	mineral	Battery-Grade Cobalt Hydroxide	High-purity cobalt hydroxide perfect for battery manufacturing. Meets all international standards and certifications.	Cobalt	20% Co min	Copperbelt	2,000 tonnes	$35,000/tonne	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 14:42:36.787221	\N	minerals	\N	\N	\N	\N	\N
686e7729-2128-4906-a423-d94de2cf64f4	test-seller-456	mineral	Gold Ore Concentrate	Gold concentrate from Northern Province operations. Ready for refining with excellent recovery rates.	Gold	45 g/t Au	Northern Province	100 tonnes	$1,200/tonne	\N	approved	2026-01-27 14:42:36.787221	2026-01-27 15:29:21.793	SKERM	minerals	\N	\N	\N	\N	\N
\.


--
-- Data for Name: membership_benefits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membership_benefits (id, tier, max_active_rfqs, can_access_analytics, can_direct_message, priority_support, visibility_ranking, monthly_price, created_at, updated_at) FROM stdin;
acc882d0-4355-4da4-b6d7-2fa04a0e3ce1	basic	1	f	f	f	3	0.00	2025-12-02 11:02:45.741501	2025-12-02 11:02:45.741501
48d6b0a3-f903-4cf4-b3ae-26c539643240	standard	5	t	t	f	2	50.00	2025-12-02 11:02:45.745667	2025-12-02 11:02:45.745667
1551990a-e072-414d-acb5-fa860ad7d357	premium	-1	t	t	t	1	200.00	2025-12-02 11:02:45.74659	2025-12-02 11:02:45.74659
1edbd1d5-a274-4cf3-975d-ebcb2c92c514	basic	3	f	f	f	3	0.00	2026-01-24 12:27:54.308689	2026-01-24 12:27:54.308689
1da8b070-8874-4b34-bc4f-b3bcc98557b2	standard	10	t	t	f	2	49.99	2026-01-24 12:27:54.308689	2026-01-24 12:27:54.308689
0a5cfb9a-a35d-45c5-95af-1a68336941a6	premium	999	t	t	t	1	149.99	2026-01-24 12:27:54.308689	2026-01-24 12:27:54.308689
6c86954d-630b-40cc-bc2c-df4118029de0	basic	3	f	f	f	3	0.00	2026-01-25 23:21:09.905723	2026-01-25 23:21:09.905723
f395fce5-df4d-4974-98e4-66d907091c12	standard	10	t	t	f	2	49.99	2026-01-25 23:21:09.905723	2026-01-25 23:21:09.905723
55ac9730-cf58-4142-93ea-7589abf318e9	premium	999	t	t	t	1	149.99	2026-01-25 23:21:09.905723	2026-01-25 23:21:09.905723
0066d6b6-c75e-4b62-a765-7153e3865db8	basic	3	f	f	f	3	0.00	2026-01-26 01:07:46.286644	2026-01-26 01:07:46.286644
9d203cd3-fb39-4737-9ab3-3794fcf31d34	standard	10	t	t	f	2	49.99	2026-01-26 01:07:46.286644	2026-01-26 01:07:46.286644
2bb238b3-5fa9-487b-b9be-b3fce8523314	premium	999	t	t	t	1	149.99	2026-01-26 01:07:46.286644	2026-01-26 01:07:46.286644
eef2ab81-6d6a-4d72-9336-7032beeb4f88	basic	3	f	f	f	3	0.00	2026-01-26 01:31:56.874439	2026-01-26 01:31:56.874439
ed6d0af6-9c00-42b7-bab1-d7329577702f	standard	10	t	t	f	2	49.99	2026-01-26 01:31:56.874439	2026-01-26 01:31:56.874439
ad44de9d-b71e-4272-84ad-6ba570549ae8	premium	999	t	t	t	1	149.99	2026-01-26 01:31:56.874439	2026-01-26 01:31:56.874439
c5caafb1-bdb1-4cb1-a078-9881d5f4565c	basic	3	f	f	f	3	0.00	2026-01-26 01:33:45.599019	2026-01-26 01:33:45.599019
a34d28c9-e2d7-422c-a488-4bb9ce2795d6	standard	10	t	t	f	2	49.99	2026-01-26 01:33:45.599019	2026-01-26 01:33:45.599019
072b1884-0f7c-4e58-93e6-4a09e965778e	premium	999	t	t	t	1	149.99	2026-01-26 01:33:45.599019	2026-01-26 01:33:45.599019
8f27870e-a267-4133-abe0-8240cda5c65f	basic	3	f	f	f	3	0.00	2026-01-26 03:29:06.938152	2026-01-26 03:29:06.938152
d86f62d1-a058-4470-a48a-38e8438d7e6d	standard	10	t	t	f	2	49.99	2026-01-26 03:29:06.938152	2026-01-26 03:29:06.938152
f79d90c4-5236-405b-9505-5bf1fb08a770	premium	999	t	t	t	1	149.99	2026-01-26 03:29:06.938152	2026-01-26 03:29:06.938152
a0baeb67-bba3-4527-b029-552261ff54e5	basic	3	f	f	f	3	0.00	2026-01-26 03:34:33.37758	2026-01-26 03:34:33.37758
015035b5-d034-40c7-8298-d9f1fa78631b	standard	10	t	t	f	2	49.99	2026-01-26 03:34:33.37758	2026-01-26 03:34:33.37758
a6955714-f167-4a64-9cb5-4c6792f34f9f	premium	999	t	t	t	1	149.99	2026-01-26 03:34:33.37758	2026-01-26 03:34:33.37758
43d5e0d3-d67a-416a-82ef-61d68fb12436	basic	3	f	f	f	3	0.00	2026-01-26 03:43:57.77637	2026-01-26 03:43:57.77637
6267f1c0-14ee-4b7a-b411-e9555be4cb8a	standard	10	t	t	f	2	49.99	2026-01-26 03:43:57.77637	2026-01-26 03:43:57.77637
4a8f420f-bf10-4431-b9f7-a4e928d75bb7	premium	999	t	t	t	1	149.99	2026-01-26 03:43:57.77637	2026-01-26 03:43:57.77637
57ba1e11-dedb-446e-9996-1838a6bf9448	basic	3	f	f	f	3	0.00	2026-01-26 03:44:21.204414	2026-01-26 03:44:21.204414
3351fd37-f7c3-44d1-b0ec-7e945261ba03	standard	10	t	t	f	2	49.99	2026-01-26 03:44:21.204414	2026-01-26 03:44:21.204414
2bee317c-3dc8-4766-9b1b-e775b62995be	premium	999	t	t	t	1	149.99	2026-01-26 03:44:21.204414	2026-01-26 03:44:21.204414
74083011-8591-4d4f-9807-6db6b476e31b	basic	3	f	f	f	3	0.00	2026-01-26 14:26:01.527571	2026-01-26 14:26:01.527571
6501101d-25f7-47b1-b3a6-b3ba8e916707	standard	10	t	t	f	2	49.99	2026-01-26 14:26:01.527571	2026-01-26 14:26:01.527571
c7eb05dd-ba82-4680-82c5-adcc4ebf9e46	premium	999	t	t	t	1	149.99	2026-01-26 14:26:01.527571	2026-01-26 14:26:01.527571
a9e1bebf-c850-468d-bf6d-1e4ba698e343	basic	3	f	f	f	3	0.00	2026-01-27 14:26:51.924007	2026-01-27 14:26:51.924007
cb020cb2-3f54-43c8-b6ba-22616d03636f	standard	10	t	t	f	2	49.99	2026-01-27 14:26:51.924007	2026-01-27 14:26:51.924007
86a4a53c-899b-400a-a317-6d57fa99eced	premium	999	t	t	t	1	149.99	2026-01-27 14:26:51.924007	2026-01-27 14:26:51.924007
8c5e3095-e047-4b94-ad2c-de6590269755	basic	3	f	f	f	3	0.00	2026-01-27 14:42:00.066842	2026-01-27 14:42:00.066842
8fc56b88-fbb0-4129-a0b6-efa24390109b	standard	10	t	t	f	2	49.99	2026-01-27 14:42:00.066842	2026-01-27 14:42:00.066842
e606187f-8384-4eda-97f7-f8384464882d	premium	999	t	t	t	1	149.99	2026-01-27 14:42:00.066842	2026-01-27 14:42:00.066842
b99053c9-43cf-4e54-8904-0fb24544b55f	basic	3	f	f	f	3	0.00	2026-01-27 14:42:36.756744	2026-01-27 14:42:36.756744
47546c34-1daf-4215-90dc-fb9b2d777d80	standard	10	t	t	f	2	49.99	2026-01-27 14:42:36.756744	2026-01-27 14:42:36.756744
9b6f36d6-63dd-4723-9ad6-d0917378dd13	premium	999	t	t	t	1	149.99	2026-01-27 14:42:36.756744	2026-01-27 14:42:36.756744
\.


--
-- Data for Name: message_idempotency; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message_idempotency (id, key, message_id, created_at) FROM stdin;
554006e2-37a0-4fcb-81d3-00c90f924263	d48f32b8-ca62-4d43-a9d4-4c1dfff2ef34	56d6dd0e-c2cf-47b9-bc1f-53fc163f4205	2025-10-31 11:42:07.856476+02
5f2d5bf0-1397-46cd-9475-2e81e8fa85f8	f6b4b2d9-1550-45f7-8eec-81a98db44858	1413dc94-c21b-48a5-a962-83de97f49a54	2025-10-31 12:58:35.76724+02
b31bcadb-d21b-4ffc-9317-3d6bcdb13add	38c27985-3fef-441e-bdac-e9e8de0c5025	cf103a95-a53e-4ab6-8192-0ebda4ef7cd1	2025-10-31 13:02:23.789421+02
7a966c00-0561-4b81-a622-e4e98c4db05a	383176a5-7c21-49b2-90db-241244171582	92ae3499-4d3c-405e-83c0-40b05a86a8cb	2025-10-31 13:07:29.620655+02
cb231867-a165-4980-9c05-ea36294dd6de	e0b6012c-b3f1-4d2f-a20d-7618224b67cb	9b01799b-f04c-4903-85c5-6761ac86bc93	2025-10-31 14:04:51.587602+02
23e21458-285c-4beb-af7a-6066315c1d13	efa7f6ae-af5a-4af6-a2c3-57bad5533a32	0b6076f5-56b5-4990-be9e-0e79aca1d5cc	2025-10-31 14:19:59.231026+02
bbdb7381-e694-4c5d-b770-55b0a0e103b0	c84c464d-cd6a-49f4-a9c7-4f7ae3bdaa5f	e2412374-81b8-4b36-bf42-4e845a06e25d	2025-10-31 15:09:40.744336+02
c3f65ef1-7b7d-4115-bba1-95d6f486e8e6	0430aac6-ca46-474f-aa60-b3cb244c2c81	8605f683-8aae-4e5c-b310-c3d71fffeab0	2025-10-31 15:11:02.471072+02
15ea02fe-cc2e-429a-835b-e8f4cca18edd	99509f0e-9917-4d52-b837-0f939d420227	f9d45708-0d71-4ace-b6f4-fb06b20b8af8	2025-10-31 15:26:34.684107+02
0ba54a19-4d68-4c6e-b6f5-61e0fe2d054b	7f750098-d1da-495b-aa4a-970e8f3450ba	dbe82b84-a305-43b1-8085-04fefb307c6f	2025-10-31 16:25:22.898498+02
dd1fa961-3eec-46a0-a436-596cb203e0ee	d7ce02da-74fa-4332-9692-7cb19100bbb7	51b0f049-5198-4b69-a8b7-34bcce608a02	2025-12-03 20:50:35.786059+02
\.


--
-- Data for Name: message_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message_templates (id, name, type, subject, content, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: message_threads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message_threads (id, title, project_id, listing_id, buyer_id, seller_id, status, last_message_at, created_at, context, type, admin_id, created_by, is_admin_support, assigned_admin_id, ticket_status, ticket_priority, resolved_at) FROM stdin;
ticket-001	Account verification not working	\N	\N	test-buyer-789	\N	open	2025-12-09 09:09:43.791	2025-12-08 11:35:38.343515	general	general	\N	test-buyer-789	t	\N	resolved	normal	\N
0a051903-2557-4515-b27c-ab315205bac1	Inquiry about: Konkola Copper Mine	1254dd1c-9c2d-4d04-b381-2dc1f4b99797	\N	test-buyer-789	\N	open	2025-12-12 10:59:42.097545	2025-12-12 10:59:42.097545	general	project_interest	test-admin-123	test-buyer-789	f	\N	open	normal	\N
ac7ac354-843b-4a74-b13d-62bc85bed020	Re: Post	\N	\N	test-admin-123	\N	open	2025-10-31 14:25:22.895	2025-10-31 16:25:22.873161	general	general	\N	test-admin-123	f	\N	open	normal	\N
2ff948f3-4ccd-4653-860a-2d7b72b3f912	Inquiry about: Konkola Copper Mine	1254dd1c-9c2d-4d04-b381-2dc1f4b99797	\N	test-buyer-789	\N	open	2025-12-12 11:12:19.71135	2025-12-12 11:12:19.71135	general	project_interest	test-admin-123	test-buyer-789	f	\N	open	normal	\N
d3e81822-7eff-4986-ac85-2f6ccdd0263b	Inquiry about: Luapula Cobalt Processing	36d4321b-df17-4094-8677-fd8f5af6595b	\N	test-buyer-789	test-admin-123	open	2025-10-31 11:34:34.177081	2025-10-31 11:34:34.177081	project_interest	project_interest	\N	test-buyer-789	f	\N	open	normal	\N
a897148b-4671-4620-9540-613faf9438ba	Inquiry about: Konkola Copper Mine	81d1d9d7-ee8d-4b26-8081-e91dd47cc160	\N	test-buyer-789	test-admin-123	open	2025-10-30 12:39:52.635813	2025-10-30 12:39:52.635813	project_interest	project_interest	test-admin-123	test-buyer-789	f	\N	open	normal	\N
17b3093d-02fc-47c0-ad86-16ead7f27418	Inquiry about: Mwinilunga Gold Exploration	85d163eb-edc5-4a3b-8893-8a34dac15443	\N	test-buyer-789	test-admin-123	open	2025-10-30 13:05:28.978472	2025-10-30 13:05:28.978472	project_interest	project_interest	test-admin-123	test-buyer-789	f	\N	open	normal	\N
1a6d3a34-f26d-4829-9313-50f1732067d5	Inquiry about: Konkola Copper Mine	81d1d9d7-ee8d-4b26-8081-e91dd47cc160	\N	test-admin-123	test-admin-123	open	2025-10-30 14:23:58.391133	2025-10-30 14:23:58.391133	project_interest	project_interest	test-admin-123	test-admin-123	f	\N	open	normal	\N
e458344c-42f5-4a53-9b93-4f6a8d17b859	Inquiry about: Central Province Gold Fields	e0682140-380f-427f-a420-8692103240de	\N	test-admin-123	test-admin-123	open	2025-10-30 14:24:01.528237	2025-10-30 14:24:01.528237	project_interest	project_interest	test-admin-123	test-admin-123	f	\N	open	normal	\N
443c0a99-e4eb-4cb8-81f3-6c9649a652d3	Post	\N	\N	test-admin-123	test-seller-456	open	2025-11-10 10:16:17.281	2025-10-31 16:16:55.786608	general	general	\N	test-admin-123	f	\N	open	normal	\N
f220fe94-48ab-48db-abf4-26d1c4cf6e5d	Inquiry about: Premium Zambian Emeralds - Investment Grade	\N	0b3f3971-5956-4538-957c-138f7b8984ca	test-buyer-789	test-seller-456	open	2025-12-06 09:37:15.216	2025-12-03 22:20:16.730191	general	marketplace_inquiry	test-admin-123	test-buyer-789	f	\N	open	normal	\N
434e5b27-5c29-4462-aa03-93ecafe5183f	Inquiry about: Konkola Copper Mine	be92ac88-bd10-4f8d-995a-b2ff1f10854c	\N	test-admin-super	\N	open	2025-12-08 11:03:59.785179	2025-12-08 11:03:59.785179	general	project_interest	test-admin-123	test-admin-super	f	\N	open	normal	\N
ticket-002	Payment issue with subscription	\N	\N	test-seller-456	\N	open	2025-12-08 09:35:38.341	2025-12-08 11:35:38.343515	general	general	\N	test-seller-456	t	test-admin-123	in_progress	urgent	\N
ticket-003	How to list products on marketplace	\N	\N	test-seller-456	\N	open	2025-12-06 09:35:38.341	2025-12-08 11:35:38.343515	general	general	\N	test-seller-456	t	test-admin-123	waiting_user	normal	\N
ticket-004	Listing approval delay	\N	\N	test-seller-456	\N	closed	2025-12-05 09:35:38.341	2025-12-08 11:35:38.343515	general	general	\N	test-seller-456	t	test-admin-123	resolved	normal	2025-12-05 11:35:38.341+02
ticket-005	KYC documentation rejected - please help	\N	\N	test-buyer-789	\N	open	2025-12-08 09:35:38.341	2025-12-08 11:35:38.343515	general	general	\N	test-buyer-789	t	\N	open	high	\N
ticket-006	Can't reset password	\N	\N	test-buyer-789	\N	closed	2025-12-07 09:35:38.341	2025-12-08 11:35:38.343515	general	general	\N	test-buyer-789	t	test-admin-123	resolved	high	2025-12-07 11:35:38.341+02
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, sender_id, receiver_id, subject, content, read, created_at, related_project_id, related_listing_id, is_auto_relay, closed, thread_id, unread, context) FROM stdin;
56d6dd0e-c2cf-47b9-bc1f-53fc163f4205	test-buyer-789	test-admin-123	Inquiry about: Premium Zambian Emeralds - Investment Grade	Inquiry about listing: Premium Zambian Emeralds - Investment Grade\n\nMessage:\nWhat is the minimum quantity you are willing to sell?	t	2025-10-31 11:42:07.851597	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
1413dc94-c21b-48a5-a962-83de97f49a54	test-buyer-789	test-admin-123	Inquiry about: Battery-Grade Cobalt Hydroxide	Inquiry about listing: Battery-Grade Cobalt Hydroxide\n\nMessage:\nIs this still available?	t	2025-10-31 12:58:35.764489	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
cf103a95-a53e-4ab6-8192-0ebda4ef7cd1	test-buyer-789	test-admin-123	Copper	Inquiry about listing: Copper\n\nMessage:\nIs this the only one available \n	t	2025-10-31 13:02:23.786027	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
92ae3499-4d3c-405e-83c0-40b05a86a8cb	test-buyer-789	test-admin-123	Inquiry about: High-Grade Copper Ore - 5000 Tonnes	Inquiry about listing: High-Grade Copper Ore - 5000 Tonnes\n\nMessage:\nYou only have ore?	t	2025-10-31 13:07:29.618138	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
9b01799b-f04c-4903-85c5-6761ac86bc93	test-buyer-789	test-admin-123	Inquiry about: Copper	Inquiry about listing: Copper\n\nMessage:\nIs this available 	t	2025-10-31 14:04:51.58512	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
0b6076f5-56b5-4990-be9e-0e79aca1d5cc	test-buyer-789	test-admin-123	Inquiry about: Copper	Inquiry about listing: Copper\n\nMessage:\nIs this still there?	t	2025-10-31 14:19:59.228178	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
e2412374-81b8-4b36-bf42-4e845a06e25d	test-buyer-789	test-admin-123	Inquiry about: Copper	Inquiry about listing: Copper\n\nMessage:\nIs this still available?	t	2025-10-31 15:09:40.740752	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
f9d45708-0d71-4ace-b6f4-fb06b20b8af8	test-admin-123	test-seller-456	Post	DO you have any material at hand?	t	2025-10-31 15:26:34.668501	\N	\N	f	f	443c0a99-e4eb-4cb8-81f3-6c9649a652d3	f	general
1d9fb9a9-e6e5-49d1-a2a9-76e860f77238	test-seller-456	test-admin-123	Post	Yes i do, what you like 	t	2025-10-31 16:42:28.807303	\N	\N	f	f	443c0a99-e4eb-4cb8-81f3-6c9649a652d3	f	general
dbe82b84-a305-43b1-8085-04fefb307c6f	test-admin-123	test-admin-123	Re: Post	Yes we still do	t	2025-10-31 16:25:22.891847	\N	\N	f	f	ac7ac354-843b-4a74-b13d-62bc85bed020	f	general
8605f683-8aae-4e5c-b310-c3d71fffeab0	test-admin-123	test-buyer-789	Message from Admin	Is there any project you are interested in?	t	2025-10-31 15:11:02.465779	\N	\N	f	f	d3e81822-7eff-4986-ac85-2f6ccdd0263b	f	general
b5bc8803-b0d7-4cf3-8675-9b20fd4d4b8d	test-seller-456	test-admin-123	Post	Attachment: Miss Han QT-IAL000045.pdf - /attached_assets/files/uploads/messages/1762769777199-Miss_Han_QT-IAL000045.pdf	f	2025-11-10 12:16:17.277899	\N	\N	f	f	443c0a99-e4eb-4cb8-81f3-6c9649a652d3	t	general
51b0f049-5198-4b69-a8b7-34bcce608a02	test-buyer-789	test-admin-123	Inquiry about: CAT 793F Haul Truck - Excellent Condition	Inquiry about listing: CAT 793F Haul Truck - Excellent Condition\n\nMessage:\nIs this available 	f	2025-12-03 20:50:35.775828	\N	\N	f	f	\N	t	general
f1315a16-2389-485b-91a3-e80cadd404a4	test-buyer-789	test-seller-456	Inquiry about: Premium Zambian Emeralds - Investment Grade	Hi, is this available?	t	2025-12-03 22:20:16.749988	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
7312b47a-acce-489a-903c-2a862c5a7fd1	test-seller-456	test-buyer-789	Inquiry about: Premium Zambian Emeralds - Investment Grade	Yes it is still available are you interested?	t	2025-12-03 22:21:14.865701	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
2863d4a1-7202-4b51-893e-f6ef8d5ab834	test-seller-456	test-buyer-789	Inquiry about: Premium Zambian Emeralds - Investment Grade	Hi, are you still interested in this project?	t	2025-12-06 10:40:43.819483	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
01e92cf0-ad0e-4343-9358-ec560d3480b9	test-buyer-789	test-seller-456	Inquiry about: Premium Zambian Emeralds - Investment Grade	Yes, can you share some more details about it	t	2025-12-06 10:41:52.392854	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
1d458ce8-5054-47a0-9324-4568001ef0f3	test-seller-456	test-buyer-789	Inquiry about: Premium Zambian Emeralds - Investment Grade	Yes sure what would you like to know about it?	t	2025-12-06 10:43:18.381379	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
f6938b43-5ab8-46c2-b5ab-64587e8d8ff2	test-buyer-789	test-seller-456	Inquiry about: Premium Zambian Emeralds - Investment Grade	What kind of paper work do you have for this?	t	2025-12-06 10:44:45.035148	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
74c5920f-df2d-44e1-b945-07ea02c7b894	test-seller-456	test-buyer-789	Inquiry about: Premium Zambian Emeralds - Investment Grade	I have ZRA, and Certificate of Origin	t	2025-12-06 10:52:28.960721	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
91cd5812-8477-4dfa-a857-cb1c1dd44452	test-seller-456	test-buyer-789	Inquiry about: Premium Zambian Emeralds - Investment Grade	What else would you like me to have i see if i can process it?	t	2025-12-06 10:52:54.190586	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
469ca643-b6d5-40cc-ba65-30a42be281c9	test-buyer-789	test-seller-456	Inquiry about: Premium Zambian Emeralds - Investment Grade	For now i think that is enough	t	2025-12-06 11:07:20.997395	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
d117e2c3-a28c-41c1-a00c-e0bd02ae139d	test-seller-456	test-buyer-789	Inquiry about: Premium Zambian Emeralds - Investment Grade	Okay sure so how do we proceed?	t	2025-12-06 11:24:14.420158	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
42bb2e82-1369-4f9e-a25b-6fef50deee2f	test-buyer-789	test-seller-456	Inquiry about: Premium Zambian Emeralds - Investment Grade	Well i will text you tomorrow with my number and then we can call	t	2025-12-06 11:30:28.946653	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
87e6a9f9-f8a2-48ed-a0dc-efcf482ecc8c	test-buyer-789	test-seller-456	Inquiry about: Premium Zambian Emeralds - Investment Grade	Can i get a time frame for when i am likely to hear from you?	t	2025-12-06 11:33:16.279625	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
dad5629f-6690-41b4-8ac0-55bdc6664f0e	test-seller-456	test-buyer-789	Inquiry about: Premium Zambian Emeralds - Investment Grade	Okay let me give you a time frame by today afternoon	t	2025-12-06 11:37:15.212319	\N	0b3f3971-5956-4538-957c-138f7b8984ca	f	f	f220fe94-48ab-48db-abf4-26d1c4cf6e5d	f	general
2882075b-c32d-4030-9508-ed912a1b0539	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2025-12-08 09:35:38.345	\N	\N	f	f	ticket-001	t	general
89bba812-b8d0-4516-964e-2662baaae16f	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2025-12-08 03:35:38.345	\N	\N	f	f	ticket-002	t	general
60273b2e-3d6f-40fe-a593-1a07ec3cf4f2	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2025-12-08 04:35:38.345	\N	\N	f	f	ticket-002	f	general
c4ec9ac0-d8d8-4675-92cc-76ed83a0aeee	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2025-12-06 10:05:38.345	\N	\N	f	f	ticket-003	f	general
d974c114-5784-430b-b004-e8599ce6a989	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2025-12-04 09:35:38.345	\N	\N	f	f	ticket-004	f	general
1a5422ca-801e-4f4c-be3c-429909941603	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2025-12-05 09:35:38.345	\N	\N	f	f	ticket-004	f	general
815642c8-8c32-4d5f-9f24-e7e3787f2f32	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2025-12-08 09:35:38.345	\N	\N	f	f	ticket-005	t	general
fda37b95-d096-4f3a-bc02-f0fb82f9a871	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2025-12-06 09:35:38.345	\N	\N	f	f	ticket-006	f	general
17298d13-5272-44bb-8fd0-c3f6efc73a3d	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2025-12-07 09:35:38.345	\N	\N	f	f	ticket-006	f	general
9c557afb-949f-4bfd-bac9-a9a7b01ffd30	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2025-12-08 11:12:27.31	\N	\N	f	f	ticket-001	t	general
36129005-9b53-491a-8007-003185d7dd6a	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2025-12-08 05:12:27.31	\N	\N	f	f	ticket-002	t	general
cc4625a7-df49-4a5b-ac0b-e6840dd258e0	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2025-12-08 06:12:27.31	\N	\N	f	f	ticket-002	f	general
61c3c701-8c52-4159-b9ec-475abc5e0ba3	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2025-12-06 11:42:27.31	\N	\N	f	f	ticket-003	f	general
91d8b4d6-8844-46f2-aae0-104b6c91cb58	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2025-12-04 11:12:27.31	\N	\N	f	f	ticket-004	f	general
bfba7381-730d-4080-9ef5-47141ef9184e	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2025-12-05 11:12:27.31	\N	\N	f	f	ticket-004	f	general
5e90c349-8b4f-4a53-81d9-c9223cb1884c	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2025-12-08 11:12:27.31	\N	\N	f	f	ticket-005	t	general
6ad4d6ae-71ca-4d22-843a-a302825abb0d	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2025-12-06 11:12:27.31	\N	\N	f	f	ticket-006	f	general
ee408c58-38ee-4112-9c00-80c24d2edee4	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2025-12-07 11:12:27.31	\N	\N	f	f	ticket-006	f	general
ba0c297f-1966-4670-84ac-8b617960feba	test-admin-super	test-buyer-789	Account verification not working	Attachment: Hellen Reference Letter.pdf - /attached_assets/files/uploads/messages/1765271383743-Hellen_Reference_Letter.pdf	f	2025-12-09 11:09:43.789373	\N	\N	f	f	ticket-001	t	general
a0f636b5-5db7-4673-9ded-cea69cdeca5e	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-24 10:27:54.365	\N	\N	f	f	ticket-001	t	general
2a8d278e-aa7b-4547-b80c-030a263ddb68	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-24 04:27:54.365	\N	\N	f	f	ticket-002	t	general
5a3ccf17-92c6-421f-8f22-86631bd047a0	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-24 05:27:54.365	\N	\N	f	f	ticket-002	f	general
427635a7-ac29-44f2-834b-aff134879644	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-22 10:57:54.365	\N	\N	f	f	ticket-003	f	general
433a95c0-994f-437b-8653-a57b610319c1	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-20 10:27:54.365	\N	\N	f	f	ticket-004	f	general
f60ea36d-d99d-4835-a6e3-7f748e677613	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-21 10:27:54.365	\N	\N	f	f	ticket-004	f	general
3cbb5cd9-9b04-4f65-8259-a38228c1095e	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-24 10:27:54.365	\N	\N	f	f	ticket-005	t	general
a615b6f5-53d2-4ab3-a4dd-70c429d1dcb3	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-22 10:27:54.365	\N	\N	f	f	ticket-006	f	general
d86b96cb-794b-4ca7-9d96-2c51bf58ecc0	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-23 10:27:54.365	\N	\N	f	f	ticket-006	f	general
5f0a5d9a-62e5-411a-be05-04ad678cc871	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-25 21:21:09.96	\N	\N	f	f	ticket-001	t	general
f43fd77a-6033-498c-9c6d-5bf1f3c399ec	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 15:21:09.96	\N	\N	f	f	ticket-002	t	general
6b121e73-f323-4a88-9342-c4244b993e74	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 16:21:09.96	\N	\N	f	f	ticket-002	f	general
b921c9aa-39de-480b-9a7e-d0aa008dd74a	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-23 21:51:09.96	\N	\N	f	f	ticket-003	f	general
d8a59156-1a1c-42b3-8b79-a24193cb5b8a	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-21 21:21:09.96	\N	\N	f	f	ticket-004	f	general
8dcb90cf-6f4f-4f01-aa62-eea28d004bba	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-22 21:21:09.96	\N	\N	f	f	ticket-004	f	general
714e9d44-6652-444d-bd0a-559ad99e27f9	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-25 21:21:09.96	\N	\N	f	f	ticket-005	t	general
8071cd0e-d80a-406b-81df-6d03fd3b2a7f	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-23 21:21:09.96	\N	\N	f	f	ticket-006	f	general
be83dc04-e4ee-4b91-952c-1ef1124a29fa	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-24 21:21:09.96	\N	\N	f	f	ticket-006	f	general
ac0e6e01-9339-4300-9b85-0e0b3cb8cb2d	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-25 23:07:46.325	\N	\N	f	f	ticket-001	t	general
96b8678f-3fad-4fee-b2d6-1ab8e696fab1	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 17:07:46.325	\N	\N	f	f	ticket-002	t	general
be69f00a-804f-410a-b315-a5d27dd00e4a	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 18:07:46.325	\N	\N	f	f	ticket-002	f	general
8e7a0808-6ac9-4fee-9661-f7c207577e72	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-23 23:37:46.325	\N	\N	f	f	ticket-003	f	general
0d40bb7b-fdaf-4c42-bb71-3a3bb09a098e	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-21 23:07:46.325	\N	\N	f	f	ticket-004	f	general
88197013-fcc1-4acb-b5a3-e46d0c3e4433	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-22 23:07:46.325	\N	\N	f	f	ticket-004	f	general
20787c9c-a7c9-4ddf-aeb1-54eb8ac73c2a	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-25 23:07:46.325	\N	\N	f	f	ticket-005	t	general
19c1eb28-8688-4f2a-aad6-3d6d51693bc8	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-23 23:07:46.325	\N	\N	f	f	ticket-006	f	general
9a29cce0-7853-435e-b9c8-a145fd82ccb8	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-24 23:07:46.325	\N	\N	f	f	ticket-006	f	general
19b4209d-6254-4362-b949-4786dcee54d0	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-25 23:31:56.933	\N	\N	f	f	ticket-001	t	general
b98984ab-ff8d-46c0-9b9d-fdcd39dfdc8f	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 17:31:56.933	\N	\N	f	f	ticket-002	t	general
3b87ebf4-2083-43a6-b6f4-e201090caf09	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 18:31:56.933	\N	\N	f	f	ticket-002	f	general
525d629d-ba53-4136-b625-22920067ecf4	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-24 00:01:56.933	\N	\N	f	f	ticket-003	f	general
4a046741-664e-49a1-adaf-4e62ec43d823	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-21 23:31:56.933	\N	\N	f	f	ticket-004	f	general
043840fb-ca3b-4449-8a9f-51a0e28c1368	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-22 23:31:56.933	\N	\N	f	f	ticket-004	f	general
843f87d3-4146-4e0d-b109-0ae95a607b02	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-25 23:31:56.933	\N	\N	f	f	ticket-005	t	general
2f6cd311-7e76-4d3b-b908-608a511e9856	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-23 23:31:56.933	\N	\N	f	f	ticket-006	f	general
5b99013d-8b3d-40a1-8780-8b098a46fe05	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-24 23:31:56.933	\N	\N	f	f	ticket-006	f	general
463da259-819f-4e8b-9a7c-129cd6a2c34c	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-25 23:33:45.63	\N	\N	f	f	ticket-001	t	general
2ddbff01-69a9-40e6-a1a1-b68e5c494577	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 17:33:45.63	\N	\N	f	f	ticket-002	t	general
6046592a-fddb-4d16-8e96-42b0fca4950b	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 18:33:45.63	\N	\N	f	f	ticket-002	f	general
649720fc-14de-436d-b925-a56949e3a015	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-24 00:03:45.63	\N	\N	f	f	ticket-003	f	general
5f00749f-e693-445e-82b3-8d3309639607	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-21 23:33:45.63	\N	\N	f	f	ticket-004	f	general
b9322166-f4ee-4bf8-9921-046ac7c49152	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-22 23:33:45.63	\N	\N	f	f	ticket-004	f	general
ce3f79a1-8170-4c2e-a9b8-dbdecdc723cb	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-25 23:33:45.63	\N	\N	f	f	ticket-005	t	general
a03b67ab-2659-4a6e-ba87-c30a0bc45c46	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-23 23:33:45.63	\N	\N	f	f	ticket-006	f	general
3023d6de-3424-401d-b8a1-f4ed66678385	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-24 23:33:45.63	\N	\N	f	f	ticket-006	f	general
4b0a47d2-6f72-4869-a0f6-e1ffd866de85	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-26 01:29:06.983	\N	\N	f	f	ticket-001	t	general
5f0ea6a9-a862-4154-abe6-871709c0547a	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 19:29:06.983	\N	\N	f	f	ticket-002	t	general
e2610752-11e0-4b07-a18d-8f5b0348ada2	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 20:29:06.983	\N	\N	f	f	ticket-002	f	general
09fbf063-8afe-48cf-86ec-6a3adef56e56	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-24 01:59:06.983	\N	\N	f	f	ticket-003	f	general
d151cfa7-00b4-435d-b2bb-6b7ea1fa614d	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-22 01:29:06.983	\N	\N	f	f	ticket-004	f	general
0fbd186c-6c80-493e-8d4f-909172a627ef	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-23 01:29:06.983	\N	\N	f	f	ticket-004	f	general
0c4e76e3-935b-482a-923b-39dd18a7a7da	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-26 01:29:06.983	\N	\N	f	f	ticket-005	t	general
36e5dbd5-901b-45a9-a40d-4baf27703b5c	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-24 01:29:06.983	\N	\N	f	f	ticket-006	f	general
3ad83229-5611-481f-a0e5-26bbdd679676	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-25 01:29:06.983	\N	\N	f	f	ticket-006	f	general
d9ff1103-e6dc-46bc-a97a-9c7e96f6e0c8	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-26 01:34:33.424	\N	\N	f	f	ticket-001	t	general
b98b2d4b-1b9e-43fc-8816-d31fc269be60	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 19:34:33.424	\N	\N	f	f	ticket-002	t	general
650c3c54-fcd4-45e3-825f-68c89b82c753	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 20:34:33.424	\N	\N	f	f	ticket-002	f	general
b41cf9b5-4a7d-4951-8826-2b387f119eab	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-24 02:04:33.424	\N	\N	f	f	ticket-003	f	general
54c6c7da-6e12-407f-93d2-26b5aa8c4958	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-22 01:34:33.424	\N	\N	f	f	ticket-004	f	general
8f1cd7a3-558e-4540-98a2-24d5e6ad94de	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-23 01:34:33.424	\N	\N	f	f	ticket-004	f	general
3c60104c-3fd7-4b78-9745-d6d34d629417	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-26 01:34:33.424	\N	\N	f	f	ticket-005	t	general
2e7e7175-748a-4da9-8eb3-68be45ba93d8	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-24 01:34:33.424	\N	\N	f	f	ticket-006	f	general
eaf16214-70f2-4637-b0e0-0dec9f688dcf	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-25 01:34:33.424	\N	\N	f	f	ticket-006	f	general
bbae139c-c2c8-43db-a064-a80393bfc073	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-26 01:43:57.82	\N	\N	f	f	ticket-001	t	general
0efd9790-8983-45e8-947a-856a9e67e632	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 19:43:57.82	\N	\N	f	f	ticket-002	t	general
7ae5d17b-966b-41c8-8b2d-43a766a66561	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 20:43:57.82	\N	\N	f	f	ticket-002	f	general
9265628b-f9c2-4558-b4e6-28dd58ab4a39	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-24 02:13:57.82	\N	\N	f	f	ticket-003	f	general
0377b515-7b4b-41a1-b350-f5e27d4a01ea	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-22 01:43:57.82	\N	\N	f	f	ticket-004	f	general
b64a1711-a11e-4504-9180-01988975dae5	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-23 01:43:57.82	\N	\N	f	f	ticket-004	f	general
eef7ccd6-996b-49b8-a401-c6cfb51f6607	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-26 01:43:57.82	\N	\N	f	f	ticket-005	t	general
25c497e0-6250-40d2-a30b-5c7a0b06b094	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-24 01:43:57.82	\N	\N	f	f	ticket-006	f	general
6734b076-87d5-45ff-b566-c5caf14d6800	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-25 01:43:57.82	\N	\N	f	f	ticket-006	f	general
57a84298-9339-470b-9fc1-6d52a72a95d7	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-26 01:44:21.247	\N	\N	f	f	ticket-001	t	general
34a625e3-4d05-436a-a87c-d2f1ef25bcf0	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-25 19:44:21.247	\N	\N	f	f	ticket-002	t	general
ec1b5aad-3a42-4fba-acfb-45f14b78f1b8	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-25 20:44:21.247	\N	\N	f	f	ticket-002	f	general
a6d24b20-6ced-41c7-8e77-cfd48d7d8b69	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-24 02:14:21.247	\N	\N	f	f	ticket-003	f	general
f059fa62-89dc-4b92-aca2-46504f582cd6	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-22 01:44:21.247	\N	\N	f	f	ticket-004	f	general
97160e34-69e2-490d-8c83-fc38f7fa2254	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-23 01:44:21.247	\N	\N	f	f	ticket-004	f	general
482c5905-3f9f-4ec4-a386-d0f09205dd18	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-26 01:44:21.247	\N	\N	f	f	ticket-005	t	general
59718d2d-ee8d-4ea1-8ad3-8abcdbeaf6a2	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-24 01:44:21.247	\N	\N	f	f	ticket-006	f	general
12ca6bdf-7d16-4e9d-a482-e049f632988f	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-25 01:44:21.247	\N	\N	f	f	ticket-006	f	general
63283fbf-6507-48c6-a861-7dffe32a4063	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-26 12:26:01.626	\N	\N	f	f	ticket-001	t	general
ebbcfa7a-5e55-4fdb-9211-1aa0149bd8db	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-26 06:26:01.626	\N	\N	f	f	ticket-002	t	general
f018a084-2a67-43fd-b53f-f31f910eb07a	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-26 07:26:01.626	\N	\N	f	f	ticket-002	f	general
5303eb61-ae02-40f6-a5c6-c37cc24ca059	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-24 12:56:01.626	\N	\N	f	f	ticket-003	f	general
047684c0-2fcd-4410-8678-5f4f2f268537	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-22 12:26:01.626	\N	\N	f	f	ticket-004	f	general
47b18a47-1353-4126-8288-1c3d7daf0e6d	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-23 12:26:01.626	\N	\N	f	f	ticket-004	f	general
cdf59dc1-59b9-46cc-9587-1bad6f269382	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-26 12:26:01.626	\N	\N	f	f	ticket-005	t	general
645fa410-f6ed-42d9-83bb-a5faa87c044d	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-24 12:26:01.626	\N	\N	f	f	ticket-006	f	general
9d1f5cb8-5d65-4a6a-b1f4-5b2bc1aab921	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-25 12:26:01.626	\N	\N	f	f	ticket-006	f	general
09eaf583-f74b-4aff-a55c-f750edd48e2b	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-27 12:26:51.962	\N	\N	f	f	ticket-001	t	general
fe5e089b-e4ac-4e69-92ff-c15ad8a17526	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-27 06:26:51.962	\N	\N	f	f	ticket-002	t	general
8d87775c-bb8d-432c-add7-5f7964dbbb8c	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-27 07:26:51.962	\N	\N	f	f	ticket-002	f	general
5a5323d7-a03b-420f-a897-a9897a27d3c0	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-25 12:56:51.962	\N	\N	f	f	ticket-003	f	general
d3d80d3e-fec7-4ae3-9288-fdabfe5d4094	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-23 12:26:51.962	\N	\N	f	f	ticket-004	f	general
1ca5a3d5-590c-4031-bff6-b020d8c40a85	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-24 12:26:51.962	\N	\N	f	f	ticket-004	f	general
320f35e3-1d19-43b5-bf9d-0d9690e004a8	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-27 12:26:51.962	\N	\N	f	f	ticket-005	t	general
5e64bc7a-bbe8-4d06-88eb-598cb0174c2c	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-25 12:26:51.962	\N	\N	f	f	ticket-006	f	general
00710e92-fa20-44a4-a86f-8f5179a22a19	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-26 12:26:51.962	\N	\N	f	f	ticket-006	f	general
f14af877-471c-4999-a8c4-249253770f42	test-buyer-789	test-admin-123	Account verification not working	Hi, I submitted my verification documents but the status remains pending for days. Can someone help?	f	2026-01-27 12:42:36.807	\N	\N	f	f	ticket-001	t	general
c7be12dd-f811-4f04-890a-6d7dceadb3ef	test-seller-456	test-admin-123	Payment issue with subscription	My subscription renewal failed but I was charged twice. Please advise.	f	2026-01-27 06:42:36.807	\N	\N	f	f	ticket-002	t	general
e1f31beb-5909-4546-9031-1098a1000491	test-admin-123	test-seller-456	Re: Payment issue with subscription	Thanks — I've located the duplicate charge and initiated a refund. Expect it within 3-5 business days.	t	2026-01-27 07:42:36.807	\N	\N	f	f	ticket-002	f	general
4f86d34b-4012-4336-b9b7-86bac18e50ef	test-admin-123	test-seller-456	Re: How to list products on marketplace	Please provide the product images and the desired listing details. I can assist with publishing.	t	2026-01-25 13:12:36.807	\N	\N	f	f	ticket-003	f	general
5ade40dc-6c5b-40f1-8d0f-9e17a8f4dc2b	test-seller-456	test-admin-123	Listing approval delay	My listing has been pending approval for over a week. Any update?	t	2026-01-23 12:42:36.807	\N	\N	f	f	ticket-004	f	general
11a8bfa9-f454-4538-bdf3-bff9dcadf128	test-admin-123	test-seller-456	Re: Listing approval delay	Apologies — the listing was approved and is now live. Thanks for your patience.	t	2026-01-24 12:42:36.807	\N	\N	f	f	ticket-004	f	general
da7f4846-236f-4a74-bdb9-b94a8879ba1e	test-buyer-789	test-admin-123	KYC documentation rejected - please help	I received a rejection notice for my KYC submission. What documents do I need to provide?	f	2026-01-27 12:42:36.807	\N	\N	f	f	ticket-005	t	general
2e935ea2-1ede-44ae-9445-ae66bcce5529	test-buyer-789	test-admin-123	Can't reset password	I tried the password reset link but it fails with an error. Please assist.	t	2026-01-25 12:42:36.807	\N	\N	f	f	ticket-006	f	general
a7bba436-8f8b-4c72-867b-44706d6740d5	test-admin-123	test-buyer-789	Re: Can't reset password	We've reset your password manually. Please check your email for a temporary link and update your password after login.	t	2026-01-26 12:42:36.807	\N	\N	f	f	ticket-006	f	general
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, type, title, message, link, read, created_at) FROM stdin;
05204823-49f5-423c-befc-a559ecc79960	test-admin-123	interest_received	New Interest in Project	Admin User expressed interest in Central Province Gold Fields	/admin/projects/e0682140-380f-427f-a420-8692103240de	t	2025-10-30 14:24:01.541273
dae5ae73-7a2b-40d0-b3c8-2ba122ac6d87	test-admin-123	interest_received	New Interest in Project	Admin User expressed interest in Konkola Copper Mine	/admin/projects/81d1d9d7-ee8d-4b26-8081-e91dd47cc160	t	2025-10-30 14:23:58.400897
b5d8b5f2-a193-4fc4-95df-bbd05747e9a4	test-admin-123	interest_received	New Interest in Project	Bob Buyer expressed interest in Mwinilunga Gold Exploration	/admin/projects/85d163eb-edc5-4a3b-8893-8a34dac15443	t	2025-10-30 13:05:28.996434
b6f2616a-fff2-48c2-8faf-2f22d909594d	test-admin-123	interest_received	New Interest in Project	Bob Buyer expressed interest in Konkola Copper Mine	/admin/projects/81d1d9d7-ee8d-4b26-8081-e91dd47cc160	t	2025-10-30 12:39:52.648837
e9902ae9-900c-4150-8aac-54e4e402020d	test-admin-123	interest_received	New Interest Expression	Bob Buyer expressed interest in project: Luapula Cobalt Processing	/projects/36d4321b-df17-4094-8677-fd8f5af6595b	t	2025-10-31 11:34:34.187752
65ebc7b5-f6b6-4ba2-a008-c0e4a9463d20	test-admin-123	interest_received	New Interest in Project	Bob Buyer expressed interest in Luapula Cobalt Processing	/admin/projects/36d4321b-df17-4094-8677-fd8f5af6595b	t	2025-10-31 11:34:34.181488
e505ad16-0aec-4f5d-b947-d1f76810dddf	test-admin-123	interest_received	New Interest Expression	Super Admin expressed interest in project: Konkola Copper Mine	/projects/be92ac88-bd10-4f8d-995a-b2ff1f10854c	f	2025-12-08 11:03:55.626022
3e4d5729-6a29-4b52-a33a-3ff9e50ed02f	test-admin-verification	interest_received	New Interest Expression	Super Admin expressed interest in project: Konkola Copper Mine	/projects/be92ac88-bd10-4f8d-995a-b2ff1f10854c	f	2025-12-08 11:03:55.630444
efe4934a-ac6a-4a25-9eea-3700ef849240	test-admin-content	interest_received	New Interest Expression	Super Admin expressed interest in project: Konkola Copper Mine	/projects/be92ac88-bd10-4f8d-995a-b2ff1f10854c	f	2025-12-08 11:03:55.631392
eb613763-b9ee-494f-b400-019bb20fed30	test-admin-support	interest_received	New Interest Expression	Super Admin expressed interest in project: Konkola Copper Mine	/projects/be92ac88-bd10-4f8d-995a-b2ff1f10854c	f	2025-12-08 11:03:55.632266
4b152b2f-fe8b-401a-909a-a41e1ab8872e	test-admin-analytics	interest_received	New Interest Expression	Super Admin expressed interest in project: Konkola Copper Mine	/projects/be92ac88-bd10-4f8d-995a-b2ff1f10854c	f	2025-12-08 11:03:55.633146
ad3ca4f7-746f-4ee0-8887-3c5d3f217306	test-admin-super	interest_received	New Interest Expression	Super Admin expressed interest in project: Konkola Copper Mine	/projects/be92ac88-bd10-4f8d-995a-b2ff1f10854c	t	2025-12-08 11:03:55.629361
bef1c42f-4f44-4378-96ed-d66e9f9cbf5f	test-admin-123	interest_received	New Interest Expression	Henry Pass expressed interest in project: Konkola Copper Mine	/projects/1254dd1c-9c2d-4d04-b381-2dc1f4b99797	f	2025-12-12 10:45:43.918008
0c860c87-204d-455b-950d-62d20393261c	test-admin-super	interest_received	New Interest Expression	Henry Pass expressed interest in project: Konkola Copper Mine	/projects/1254dd1c-9c2d-4d04-b381-2dc1f4b99797	f	2025-12-12 10:45:43.919347
2ab1edcd-f11c-465c-9f4f-75e82424311e	test-admin-verification	interest_received	New Interest Expression	Henry Pass expressed interest in project: Konkola Copper Mine	/projects/1254dd1c-9c2d-4d04-b381-2dc1f4b99797	f	2025-12-12 10:45:43.920179
d8616afe-09cb-4e38-a435-5a35bf719dec	test-admin-content	interest_received	New Interest Expression	Henry Pass expressed interest in project: Konkola Copper Mine	/projects/1254dd1c-9c2d-4d04-b381-2dc1f4b99797	f	2025-12-12 10:45:43.921155
f8fe44e8-912a-4694-b574-653cc901bfbb	test-admin-support	interest_received	New Interest Expression	Henry Pass expressed interest in project: Konkola Copper Mine	/projects/1254dd1c-9c2d-4d04-b381-2dc1f4b99797	f	2025-12-12 10:45:43.921978
03c96cc3-785d-4ec5-8aae-7a74452846a8	test-admin-analytics	interest_received	New Interest Expression	Henry Pass expressed interest in project: Konkola Copper Mine	/projects/1254dd1c-9c2d-4d04-b381-2dc1f4b99797	f	2025-12-12 10:45:43.922737
786286fc-efe1-4622-8adf-b2ddd381ed46	test-admin-123	interest_received	New Interest Expression	Henry Pass expressed interest in project: Luanshya Copper Tailings Reprocessing	/projects/aa4b0660-c009-4ed9-9c2d-9f224d9af255	f	2025-12-12 10:59:26.704574
0636ac06-e72d-41dd-9d93-97c52263ed80	test-admin-super	interest_received	New Interest Expression	Henry Pass expressed interest in project: Luanshya Copper Tailings Reprocessing	/projects/aa4b0660-c009-4ed9-9c2d-9f224d9af255	f	2025-12-12 10:59:26.707054
2d3d43cf-2f70-4670-9cd3-f8eef8d39162	test-admin-verification	interest_received	New Interest Expression	Henry Pass expressed interest in project: Luanshya Copper Tailings Reprocessing	/projects/aa4b0660-c009-4ed9-9c2d-9f224d9af255	f	2025-12-12 10:59:26.70828
c99fd6a1-2d32-41f1-a055-e6392882aa88	test-admin-content	interest_received	New Interest Expression	Henry Pass expressed interest in project: Luanshya Copper Tailings Reprocessing	/projects/aa4b0660-c009-4ed9-9c2d-9f224d9af255	f	2025-12-12 10:59:26.709424
1fd48383-4888-4f8d-9351-e9be67b743be	test-admin-support	interest_received	New Interest Expression	Henry Pass expressed interest in project: Luanshya Copper Tailings Reprocessing	/projects/aa4b0660-c009-4ed9-9c2d-9f224d9af255	f	2025-12-12 10:59:26.710609
958e32f2-523b-4f67-aded-02c6d4467837	test-admin-analytics	interest_received	New Interest Expression	Henry Pass expressed interest in project: Luanshya Copper Tailings Reprocessing	/projects/aa4b0660-c009-4ed9-9c2d-9f224d9af255	f	2025-12-12 10:59:26.712503
50476f16-21ca-46e5-9896-f160ed66f06b	test-admin-123	message	New Contact Submission	Ray Pass submitted a contact: Njala Kuno	/admin/contact-submissions?id=f16f5260-2518-4aef-9d4f-3c0f274cbae3	f	2025-12-12 13:12:20.980115
7aab5d38-8e34-4f4f-9cc3-d8a4653e8759	test-admin-verification	message	New Contact Submission	Ray Pass submitted a contact: Njala Kuno	/admin/contact-submissions?id=f16f5260-2518-4aef-9d4f-3c0f274cbae3	f	2025-12-12 13:12:20.984089
5dd495e4-d2ca-4b4d-b142-556c961ae1d2	test-admin-content	message	New Contact Submission	Ray Pass submitted a contact: Njala Kuno	/admin/contact-submissions?id=f16f5260-2518-4aef-9d4f-3c0f274cbae3	f	2025-12-12 13:12:20.985806
c69171b0-8ae1-458f-9d7d-0b7694a63de1	test-admin-support	message	New Contact Submission	Ray Pass submitted a contact: Njala Kuno	/admin/contact-submissions?id=f16f5260-2518-4aef-9d4f-3c0f274cbae3	f	2025-12-12 13:12:20.98711
ca0ba7b6-18fa-45dd-a113-a61740446b02	test-admin-analytics	message	New Contact Submission	Ray Pass submitted a contact: Njala Kuno	/admin/contact-submissions?id=f16f5260-2518-4aef-9d4f-3c0f274cbae3	f	2025-12-12 13:12:20.988452
25d43651-f1bf-498b-be68-1a00d7ee173e	test-admin-super	message	New Contact Submission	Ray Pass submitted a contact: Njala Kuno	/admin/contact-submissions?id=f16f5260-2518-4aef-9d4f-3c0f274cbae3	t	2025-12-12 13:12:20.982858
\.


--
-- Data for Name: payment_method_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_method_details (id, method, name, description, instructions, account_details, is_active, created_at, updated_at, currency_code, currency_name) FROM stdin;
6ebf8142-4813-4f2e-8e2a-1a38ec847e40	bank_transfer	Bank Transfer	Direct bank transfer to our corporate account	Please transfer the exact amount to:\n\nBank: First National Bank (FNB)\nAccount Name: Fusion Mining Limited\nAccount Number: 1234567890\nBranch: Lusaka Main\nSwift Code: FIRNZMLX\n\nReference: Your upgrade request ID	{"bank": "First National Bank (FNB)", "branch": "Lusaka Main", "swiftCode": "FIRNZMLX", "accountName": "Fusion Mining Limited", "accountNumber": "1234567890"}	t	2026-01-27 14:42:36.817258	2026-01-27 14:42:36.817258	ZMW	Zambian Kwacha
2a1a0383-b8f8-4212-b435-73dc0b937cbc	airtel_money	Airtel Money	Mobile money transfer via Airtel Money	Send money to:\n\nPhone Number: +260 97 123 4567\nName: Fusion Mining Limited\n\nReference: Your upgrade request ID\n\nPlease ensure you send from a registered Airtel Money account.	{"name": "Fusion Mining Limited", "qrCode": "/attached_assets/files/payments/wechat_qr.jpg", "phoneNumber": "+260 97 123 4567"}	t	2026-01-27 14:42:36.817258	2026-01-27 14:42:36.817258	ZMW	Zambian Kwacha
7a12ade9-59a8-4b7e-8002-f6b829c8b728	wechat_alipay	WeChat Pay / Alipay	Payment via WeChat Pay or Alipay for international users	Scan the QR code or use the following details:\n\nWeChat Pay ID: fusionmining_zambia\nAlipay ID: fusionmining@alipay.com\n\nReference: Your upgrade request ID\n\nContact us if you need assistance with the payment.	{"alipayId": "fusionmining@alipay.com", "wechatId": "fusionmining_zambia", "alipayQrCode": "/attached_assets/files/payments/alipay_qr.jpg", "wechatQrCode": "/attached_assets/files/payments/wechat_qr.jpg"}	t	2026-01-27 14:42:36.817258	2026-01-27 14:42:36.817258	CNY	Chinese Yuan
\.


--
-- Data for Name: platform_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.platform_settings (id, key, value, data_type, description, category, is_public, updated_by, updated_at) FROM stdin;
83abbcc3-ae58-4001-808e-0e57008d0a53	platform_name	Fusion Mining Limited	string	Name of the platform	general	t	\N	2025-12-09 11:06:05.037299+02
cc196907-5498-4e24-b2e2-4ad39b484976	platform_tagline	B2B Mining Marketplace & Investment Platform	string	Platform tagline and description	general	t	\N	2025-12-09 11:06:05.039954+02
d0279824-d18f-4b79-87e7-f146606f150f	commission_rate	5	number	Platform commission rate on transactions (percentage)	payment	f	\N	2025-12-09 11:06:05.040606+02
b8c1f7d3-f2fd-445f-8c02-b132907ece95	support_email	support@fusionmining.com	string	Contact email for platform support	email	t	\N	2025-12-09 11:06:05.041247+02
b54cb175-3dbc-4755-8dd2-0207c1a723f8	smtp_enabled	false	boolean	Enable SMTP email sending	email	f	\N	2025-12-09 11:06:05.04178+02
02c2648e-2a47-439c-ab8b-168fcfa3967f	maintenance_mode	false	boolean	Enable/disable maintenance mode	general	f	\N	2025-12-09 11:06:05.042277+02
0395fb1d-5b56-4590-9790-76b89cd140de	max_upload_size_mb	10	number	Maximum file upload size in megabytes	general	f	\N	2025-12-09 11:06:05.042817+02
e5f036ad-21c0-4768-b027-06ab05038976	auto_approve_listings	false	boolean	Automatically approve marketplace listings without admin review	general	f	\N	2025-12-09 11:06:05.043377+02
a284721d-279f-4b13-9e14-db953dd2a48f	session_timeout_hours	24	number	User session timeout in hours	security	f	\N	2025-12-09 11:06:05.044281+02
acb72b07-c1b1-4d9b-8c31-f1165e752296	require_email_verification	true	boolean	Require users to verify their email address	security	f	\N	2025-12-09 11:06:05.044853+02
b3002834-6eab-43fd-b778-ff779d0b4fd9	stripe_enabled	false	boolean	Enable Stripe payment processing	payment	f	\N	2025-12-09 11:06:05.045377+02
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, description, license_type, minerals, location, latitude, longitude, status, image_url, area, estimated_value, created_at, updated_at, item_id, owner_id) FROM stdin;
678a8785-68e6-4db4-bc63-45f86a048a2f	Copperbelt Exploration	High-grade copper deposits in the Copperbelt Province	exploration	{Copper,Cobalt}	Copperbelt	\N	\N	active	\N	\N	\N	2025-10-21 12:45:37.481795	2025-10-21 12:45:37.481795	DTYXR	\N
32ea297f-1c04-4f9c-8de9-63649f8b428b	Emerald Valley Mine	Premium emerald mining operation	mining	{Emerald}	Luapula Province	\N	\N	active	\N	\N	\N	2025-10-21 12:45:37.481795	2025-10-21 12:45:37.481795	5MFVA	\N
36832643-3cc6-43a6-97e7-05cb31382543	Northern Gold Project	Gold exploration with promising surveys	exploration	{Gold}	Northern Province	\N	\N	active	\N	\N	\N	2025-10-21 12:45:37.481795	2025-10-21 12:45:37.481795	U6XGG	\N
38ddeaba-2b4a-49a0-ad21-9dc44f35aeb4	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-10-23 13:09:28.884817	2025-10-23 13:09:28.884817	TP4P9	\N
9384bcc2-0006-4e37-a899-13885b7b6ecb	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-10-23 13:09:28.884817	2025-10-23 13:09:28.884817	BZ6LA	\N
6e6d968d-f8cb-463b-b056-288cfc77fe0f	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-10-23 13:09:28.884817	2025-10-23 13:09:28.884817	9KYFC	\N
4cae4e3a-8154-4602-94b0-bf99207d342b	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-10-23 13:09:28.884817	2025-10-23 13:09:28.884817	39C94	\N
ac618ff0-adb1-4ec6-8063-f6f5c512861b	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-10-23 13:09:28.884817	2025-10-23 13:09:28.884817	VP9H6	\N
94ce1d72-4629-4be4-b439-09de9a6e4c56	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-10-23 14:24:13.548259	2025-10-23 14:24:13.548259	VZ5V5	\N
e066c3a3-6734-493e-ab7f-ffb94c2075e5	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-10-23 14:24:13.548259	2025-10-23 14:24:13.548259	XA3JH	\N
a9146b11-3fb2-465c-aa2f-5a4e223c822a	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-10-23 14:24:13.548259	2025-10-23 14:24:13.548259	BVZWY	\N
43e0c304-2e59-47e0-ac43-94a38a3234ce	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-10-23 14:24:13.548259	2025-10-23 14:24:13.548259	WTTBM	\N
51fe7e9e-3f11-4bf0-81a8-0ec8da645155	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-10-23 14:24:13.548259	2025-10-23 14:24:13.548259	DHWFC	\N
81d1d9d7-ee8d-4b26-8081-e91dd47cc160	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-10-23 14:38:31.537168	2025-10-23 14:38:31.537168	LKQSU	\N
bf424c71-6f7b-4da2-a5af-85da5d93000a	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-10-23 14:38:31.537168	2025-10-23 14:38:31.537168	MVZW2	\N
85d163eb-edc5-4a3b-8893-8a34dac15443	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-10-23 14:38:31.537168	2025-10-23 14:38:31.537168	XGJ3D	\N
36d4321b-df17-4094-8677-fd8f5af6595b	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-10-23 14:38:31.537168	2025-10-23 14:38:31.537168	7A875	\N
e0682140-380f-427f-a420-8692103240de	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-10-23 14:38:31.537168	2025-10-23 14:38:31.537168	S55FV	\N
04f64fc0-105c-4c1c-b409-bf9b9ccd3825	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
c0df9487-44c3-44a8-9d59-c9433cafca70	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
7db371cd-4c5b-483b-a3e3-7b0444237f58	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
11cba16e-e63a-4e4b-aa14-e9730ead6bff	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
dbebd3b4-23cb-4f6f-a4c2-782699dc908a	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
a0a4e319-7661-4dee-a8d1-2ef6fabdc6ff	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
a93d18c1-9a7e-4e53-9f98-e8fc8c897c28	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
f3f0bab9-c99c-4c37-b661-dd8000944010	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
19b53e3c-f218-4617-8c8f-b64a7dd54339	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
044525f0-e384-4494-b83c-f2f81960d58f	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2025-11-03 12:28:51.621258	2025-11-03 12:28:51.621258	\N	\N
ec93e593-d8bc-49a5-95a5-0d480149bdcb	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
8c72ecbb-d20b-4be0-9c3e-169710344189	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
9c9b2498-155e-4c43-8cae-6082d6653485	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
95ee9e23-968c-427a-bfb2-b2dab9f9346a	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
8dcb9909-b93a-4335-81ce-f7520ba361eb	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
50e68f17-0640-4f82-9ba2-7e92009ecab8	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
50814e1f-518a-4d63-a309-d8735dff358a	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
2d0ef59c-227c-44b5-907f-1cf689794401	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
d3da9086-bd7d-4e88-86b9-06ed5087e6cd	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
1031dd9e-c7cf-4dfe-a767-e21e44406f7a	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2025-11-03 12:34:24.100742	2025-11-03 12:34:24.100742	\N	\N
67ab2d79-b241-4947-8741-ca8df35e4fb8	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
daa3d307-bc90-482b-8898-8b3132949410	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
1c0398c7-9105-4a74-a832-92b8a5928088	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
066d3e5a-761c-4a4b-b62e-d053ec129c52	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
ad9213fa-fb58-458f-8da8-e6686503edf6	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
28939ddf-970e-400a-92e0-cc0b60e432e0	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
a45950fc-1f9c-4563-aa52-378ebfeffef5	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
8d57d256-6b67-41be-ba4a-619758b93599	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
94aa1e5e-7dec-4f47-bd65-4387611d6da0	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
c03cb06e-eb3f-4970-88aa-b79024409ab7	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2025-11-03 13:30:51.401882	2025-11-03 13:30:51.401882	\N	\N
be92ac88-bd10-4f8d-995a-b2ff1f10854c	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
6f9d0e4c-ce15-4142-8414-961762161720	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
9273b20a-078f-4534-8309-bf413a6aa1ab	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
ba972e54-0eb4-49a2-83de-19fe32df5b98	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
c867d367-d883-4a89-8641-7a2ebe5be70d	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
4e1008c7-0c99-4cfd-9e58-060c4804515b	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
4d4f8b6b-29bd-451a-aa7b-27f6f97bb25f	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
0054f40e-623e-4128-8842-d2a52ba39d72	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
37472505-a5c1-49bd-a99f-20bae1bb3da5	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
39ddd971-cb3d-4506-8bb6-b4e433f1a3b8	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2025-11-03 13:33:44.078558	2025-11-03 13:33:44.078558	\N	\N
2010f2fd-1b90-4811-9ab9-6365d48888fd	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
2d88fc80-4d07-4ed4-b323-ee47f0c124a3	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
eee976d4-1477-48dd-b8b4-f7df1cfa19be	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
d1e88232-d270-45c4-8436-bfb2b6531ede	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
b1578de7-d5b8-4400-aead-755790ee74cc	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
6999debc-4b55-4a41-99ad-98b15b9a4feb	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
b6a5e0f2-f597-49cb-9d95-66940c84f9e7	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
db2bb3a8-b273-4f54-a7fd-1d99552ec463	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
28b9c75b-b2a5-4f0a-be7e-e6d131d18475	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
1a032548-a87e-42a1-927d-78f59e39ba03	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2025-12-08 11:35:38.322297	2025-12-08 11:35:38.322297	\N	\N
1254dd1c-9c2d-4d04-b381-2dc1f4b99797	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
8f296430-fd5c-4b95-9111-849771d61152	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
ed56867b-11c4-4242-91a3-3bae1419da69	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
5f8a7b35-d130-420f-8875-406ad15aa302	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
fd2c7a34-28b0-4cc1-8b86-2a7826c7689c	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
c9b93f67-d0a8-4329-b24d-2872ac9fdc02	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
0f96e4d1-72f8-4282-80e5-ac71befbd34d	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
9d125bd2-bd51-41ec-ab19-26d5f45663e5	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
6c069c52-3890-4f2d-950b-b18f4f15c4e2	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
aa4b0660-c009-4ed9-9c2d-9f224d9af255	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2025-12-08 13:12:27.282943	2025-12-08 13:12:27.282943	\N	\N
53469cfa-bca3-482c-80d3-dd8772c88ac9	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
60f1e6ae-f29c-4964-bd57-93d92aa693c4	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
3bc3bcb5-6b4b-4571-9d34-67fcb5998c8e	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
f9155236-20da-4f35-ba43-e1ce04651969	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
6d0ae720-71bd-40db-8bf0-75caeb90bbe8	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
61a23e18-c558-48e2-8b6f-84f3be610966	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
6e7ca84b-d3fe-4a42-a1d7-a0a3862515bd	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
60e6465b-bd3b-4ada-95dd-1a734a230ec4	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
7705ff52-2c91-45be-a4cb-a7e1fc01d6f7	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
b7a3b19f-3dd6-4956-bafc-0b99ddcdb164	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-24 12:27:54.332314	2026-01-24 12:27:54.332314	\N	\N
ce5f3bb0-ed43-4568-93f6-fde9b214b82a	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
f461c5d3-518a-4aff-9c74-06b895aaba49	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
4f90bca9-9493-48d7-b8ac-b032e9f050c0	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
201f9301-adc3-4b38-9cfc-5e9ebf79db02	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
16478d6d-2aa1-4b59-8bbe-d3d42d0944b7	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
968a5ed8-9156-47b3-aac9-31afecf2c85c	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
f1e8236a-71f4-4d05-a5c6-8b61b50e354d	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
43ea23f8-575f-41c0-97b3-39ef158a9336	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
d9537ba0-841d-4b0a-90c3-3383e370232c	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
3124958b-dc43-45b2-a972-89c44335cdef	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-25 23:21:09.928643	2026-01-25 23:21:09.928643	\N	\N
639964da-2de7-42c6-923f-c79b6486eb75	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
213526d0-0782-4aee-97cf-0caab03a4dab	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
71481a8b-9349-4646-aeb2-3abfd2e8a131	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
7040b09c-00a1-427a-a781-6d24e71f2097	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
2fa40555-a2fb-4f6d-8cb3-b46700185059	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
3241f295-c163-4f9f-836f-6a3c9ce8fde3	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
713e58ea-4b38-47ec-a4f6-f909203d5bf4	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
b5600734-a56d-4cbb-9d31-7c48eab04d38	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
d44e937e-731e-4bf8-a370-27cd2527bde3	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
662c61e3-f0cb-4877-9e2f-7d713270192e	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 01:07:46.302021	2026-01-26 01:07:46.302021	\N	\N
7901fee4-4a22-471c-8702-a8581a9248ea	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
1dff54af-def8-40d6-bf53-0fe11ffcbe97	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
4e41bc8e-1d2c-416a-bc48-a3907bdc2dd0	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
bea35d67-1b85-4e85-bb8a-d91912343b90	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
e41148c3-093f-467c-b483-e180d6389687	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
26f4a4a2-d4ca-4961-b61b-93f647beb787	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
f3cf14d9-7481-4573-a632-09990b68a83a	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
ac7aabfc-f9cb-443b-8dde-cee8fe4b648c	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
196fe328-69a9-4022-9a5a-7920f009b042	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
99d37a24-f42c-4468-99f8-25dcf12b38cf	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 01:31:56.902347	2026-01-26 01:31:56.902347	\N	\N
34c2c7cb-db2d-4d4a-996b-f81e2c6a8ab5	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
9324be81-966d-4510-bd26-e099fea54af9	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
60f9b141-d2f3-4ad7-9f86-2db64fdd4369	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
4e11d52c-7074-4427-b6c2-465262bdb301	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
eaa42dba-76db-45ac-b2c6-eb2fa4c7df5a	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
a8bed614-f3a8-4e6e-888c-b9f04c284a28	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
7b74d2ef-3d2f-4c07-a07d-8ee20195c4a8	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
edd3a051-ffe7-4442-ad60-ab90fc36249b	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
681676b7-1aa6-4501-94e9-764340f0a6d4	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
bd4af9b6-9048-4c96-bacf-2bf3d745e990	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 01:33:45.617294	2026-01-26 01:33:45.617294	\N	\N
4132f33b-0c84-4f21-be5c-46f2deabe9e0	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
f5535843-49c9-4d48-9b95-19d3d3c29008	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
942857b2-4203-44a6-b479-ff993cb21c61	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
fd859cb9-c9ea-4c0a-85bf-4583e1423c4b	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
f32aa32d-af76-4ce1-98aa-7c70c8377eb3	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
c268de02-d19f-4e1d-8a61-4a0b40aadf76	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
30fcdded-56cc-4a0f-97b1-83b29cb10b2b	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
36c08445-60ea-43df-be19-7b14ce4a1a8e	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
9366bc1f-968e-4826-a75a-6b517e5520a5	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
2b47d32c-2a8d-462a-972b-4be15bbe4a92	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 03:29:06.955495	2026-01-26 03:29:06.955495	\N	\N
dae01b4e-0069-422b-b892-5bc1a18c00ff	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
b6c23a86-6ff6-40b0-886b-8d6e149e6b7b	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
6aa9b2b5-793b-4a2b-ae4f-6c8adbb74866	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
a3fe9524-30ea-4af8-8c1c-8893e9b69012	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
4a765976-f673-420e-9caa-6625d4b6069c	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
2464d7e0-ee8d-4e1d-bf54-bdce66037130	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
0dccb8fc-3acc-48f0-bd67-ca64eb79bb60	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
92b2bce8-d42d-4071-b1f1-4ae82d1d5249	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
5e48f1b1-13f9-461e-9ef5-2cc6f06b8a10	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
d4a1d7be-c2e4-46f1-86fd-1b5f8805360b	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 03:34:33.396609	2026-01-26 03:34:33.396609	\N	\N
4b556ba1-5542-4b3a-a5f1-1f9510cc1ff7	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
5d9877f8-a61e-4ca2-81b7-1b47fda8ffc1	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
de0c801f-9176-4911-aaf4-36e82e42f84e	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
91d665ab-af03-4bec-b8ee-46288e3f4f76	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
2c2a9e0f-e2c6-480b-a8bc-a5b42e1eec4e	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
bd003c7f-173b-4d12-8ec4-8d9002defc04	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
551e47b3-b435-4b43-a281-1844c5d16d70	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
142fdbb9-ea2d-4511-a044-e1a590e277a5	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
64ccf1ec-e26d-46d6-83c8-bec3fbba9af8	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
478e5e3a-ea01-49c1-b44d-0ed972ea4889	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 03:43:57.793526	2026-01-26 03:43:57.793526	\N	\N
8ecf647e-6e2f-4123-931a-7ab408c2d2a2	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
00e41528-8aaa-4c71-bd58-cf080597f943	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
3381187d-80ac-414f-b4ed-64945b307e2b	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
d3506b34-50a7-4122-97d6-6e19ab868a8a	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
c0c57877-a5f0-4f4f-8151-4e3d9e30121e	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
311278a8-5e3b-47b3-b81d-ffe75297f7f8	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
ad7e38fb-c012-4400-b897-6d01bf65bc00	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
8412ac47-ac6a-4c77-8da5-459d19112b55	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
2bf8379a-d326-4ab4-a179-f26fb143e29f	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
1089199e-4141-4192-baeb-3a25c250dad2	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 03:44:21.222626	2026-01-26 03:44:21.222626	\N	\N
96b34587-37aa-43f3-9cf7-d87f4a922261	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
cdf4cc11-af53-47b9-a583-03874c1c756e	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
f5cdb706-2dfb-4f80-ac41-dbb1f495266f	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
5a5df277-2fc5-4526-96b4-a39619c63ee3	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
48681acd-8f01-46ac-a15b-c3d5bf4484bf	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
73f14a6e-772b-4804-b72c-eefafae8e56a	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
7727830c-689f-40c7-8cc8-0ed5218b94aa	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
53ad67b1-8d28-44d0-8769-ac92551ec539	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
2c34504f-67f7-4b63-a0c3-24d190091b9a	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
8a7d349d-8381-4605-8909-87afb2b5233c	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-26 14:26:01.562575	2026-01-26 14:26:01.562575	\N	\N
0336ec76-eaa0-42b4-b16e-788d349880ba	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
d271beb6-3628-4023-9bef-33d4af3366a2	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
c19194a9-d216-4c7f-aca2-15220f53f0c9	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
e51f380a-29a7-4d05-8f66-42fbdd2d8e5d	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
7fac5639-1b1c-41e7-bc4a-25d90e78a5cb	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
b0c723d9-5fc0-4026-b268-517d8042d9f6	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
88bc9554-5e54-4585-ab37-191ea0a29a36	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
8de99f84-b02e-4178-9281-0d2188289883	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
95a89035-ff45-4111-be55-4630bd12e5c1	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
327dad05-0069-4cd1-ad98-73bd5365668a	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-27 14:26:51.939457	2026-01-27 14:26:51.939457	\N	\N
7d04bf78-dd3b-4cf5-b55b-c61c65395bb3	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
ac4b07eb-7ff2-4a06-a9b9-bec14e30fcb1	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
35dcc04a-faf2-44dd-af96-23b3d128294c	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
27b8f5cb-6083-4497-a083-e8168d0cd0b1	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
5a31313b-f904-4cbb-ac97-f685b4cfc914	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
6da0e7f0-b74c-4476-9c6b-514d7db7d64e	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
2ec90081-ec05-40df-aeb0-5c09eb772f93	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
5a656222-fd07-4cfe-9136-57c9d4b222eb	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
de83d88e-6f8e-4685-84b1-bec3c27c0078	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
72b9c4b8-595b-4c47-9fa4-ca5fa14b22f7	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-27 14:42:00.085011	2026-01-27 14:42:00.085011	\N	\N
f1c026c3-1b9d-480b-bb2c-8db4e9f48cbe	Konkola Copper Mine	Large-scale copper mining operation in the Copperbelt Province. Excellent infrastructure and proven reserves of high-grade copper ore.	mining	{Copper,Cobalt}	Copperbelt	-12.4178000	27.4178000	active	\N	1,200 hectares	$500M - $1B	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
c92570f5-a771-4c6c-aea3-860d22792a68	Kagem Emerald Mine	World's largest emerald mine producing premium quality gemstones. Partnership opportunities available for exploration expansion.	mining	{Emerald}	Copperbelt	-13.0000000	28.0000000	active	\N	41 square kilometers	$100M - $300M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
663c01d9-e402-4df6-a0d1-2ab98fee8d9a	Mwinilunga Gold Exploration	New gold exploration license in promising geological formation. Seeking investment partners for initial drilling and sampling.	exploration	{Gold}	Northern Province	-11.7358000	24.4289000	active	\N	500 hectares	$50M - $150M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
e66d1b79-a090-4b47-9190-6449169e42f7	Luapula Cobalt Processing	Strategic cobalt processing facility with modern infrastructure. Perfect for battery-grade cobalt production.	processing	{Cobalt}	Luapula Province	-11.6667000	28.7167000	active	\N	200 hectares	$200M - $400M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
825836de-2dd0-4eeb-b04f-0c4f74543609	Central Province Gold Fields	Multiple gold-bearing sites across Central Province. Excellent potential for small to medium scale operations.	exploration	{Gold,Silver}	Central Province	-14.4333000	28.2833000	pending	\N	800 hectares	$75M - $200M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
c8f4a86a-8f6a-48ab-9da7-a65f139e6148	Solwezi Copper-Gold Prospect	Promising copper-gold deposit in Northwestern Province. Recent surveys indicate high-grade mineralization. Perfect for joint venture partnerships.	exploration	{Copper,Gold}	Northwestern Province	-12.1833000	26.3833000	active	\N	650 hectares	$120M - $250M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
7a02e0d1-e776-4a42-a75c-37d54b6729d0	Southern Province Manganese	Newly discovered manganese deposits with excellent access to transportation networks. Strategic location near major rail lines.	exploration	{Manganese}	Southern Province	-16.6667000	27.8667000	pending	\N	400 hectares	$60M - $140M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
364e81c0-7e5c-425b-aa16-67ccc94ffc8d	Eastern Province Gemstone Fields	Diverse gemstone deposits including aquamarine, tourmaline, and amethyst. Ideal for boutique mining operations.	mining	{Aquamarine,Tourmaline,Amethyst}	Eastern Province	-13.5000000	32.0000000	active	\N	300 hectares	$30M - $80M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
4e031cb1-c413-45f4-9aca-b00164f7ceb5	Kafue River Uranium Project	Strategic uranium deposits with potential for clean energy applications. Requires specialized expertise and regulatory compliance.	exploration	{Uranium}	Central Province	-15.7667000	28.1833000	pending	\N	1,000 hectares	$200M - $500M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
52626694-209a-4ad1-99bb-881ea4705f16	Luanshya Copper Tailings Reprocessing	Modern tailings reprocessing facility targeting historic copper waste. Environmentally sustainable with proven recovery potential.	processing	{Copper}	Copperbelt	-13.1361000	28.4167000	active	\N	150 hectares	$80M - $180M	2026-01-27 14:42:36.782113	2026-01-27 14:42:36.782113	\N	\N
\.


--
-- Data for Name: seller_verification_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seller_verification_documents (id, request_id, document_type, file_name, file_path, file_size, mime_type, uploaded_at) FROM stdin;
\.


--
-- Data for Name: seller_verification_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seller_verification_requests (id, seller_id, status, rejection_reason, submitted_at, reviewed_at, reviewed_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (sid, sess, expire) FROM stdin;
AhNG7AmCm9lD32_BO6ernTTlbbaPlt8n	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-13T07:13:49.575Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 86400000}, "passport": {"user": "test-admin-super"}}	2025-12-13 09:13:59
FfkLmTpObyeCCi7LR_OZAYOmWPSUkxNB	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-19T08:28:38.474Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 86400000}, "passport": {"user": "test-buyer-789"}}	2025-12-19 10:36:22
gVG3sJaI4-sUUEktQuFif__e1rkWRgM8	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-13T08:44:36.928Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 86400000}, "passport": {"user": "test-admin-super"}}	2025-12-13 14:21:59
Q9X26x2_bN-xPtZ9Pe7yOIQFUlmghT3p	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-13T13:09:56.718Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 86400000}, "passport": {"user": "test-admin-super"}}	2025-12-13 15:48:35
wG3-1gj2gZKWmbBnaxtZ5aCBo8aS_BNA	{"cookie": {"path": "/", "secure": false, "expires": "2025-12-13T07:13:18.294Z", "httpOnly": true, "sameSite": "lax", "originalMaxAge": 86400000}, "passport": {"user": "test-admin-super"}}	2025-12-13 09:13:19
\.


--
-- Data for Name: settings_audit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings_audit (id, setting_key, old_value, new_value, changed_by, changed_at) FROM stdin;
\.


--
-- Data for Name: sustainability_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sustainability_content (id, title, section, content, image_url, "order", created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tier_upgrade_payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tier_upgrade_payments (id, upgrade_request_id, user_id, requested_tier, payment_method, amount, currency, status, payment_details, proof_of_payment_url, submitted_at, verified_at, verified_by, rejection_reason, created_at, updated_at, amount_usd, exchange_rate) FROM stdin;
adb9f217-d7d4-4498-9111-8a4d382e0049	tier-upgrade-1769379557385	f93f34bd-316f-44c2-b4a1-76431aec4013	standard	airtel_money	50.00	USD	pending	{"name": "Fusion Mining Limited", "phoneNumber": "+260 97 123 4567"}	\N	2026-01-26 00:19:46.639581	\N	\N	\N	2026-01-26 00:19:46.639581	2026-01-26 00:19:46.639581	50.00	\N
a1831788-0b91-45d6-8777-53d25038a02b	tier-upgrade-1769380070845	f93f34bd-316f-44c2-b4a1-76431aec4013	standard	airtel_money	50.00	USD	pending	{"name": "Fusion Mining Limited", "phoneNumber": "+260 97 123 4567"}	\N	2026-01-26 00:28:05.803573	\N	\N	\N	2026-01-26 00:28:05.803573	2026-01-26 00:28:05.803573	50.00	\N
946a99be-920d-48c3-8ee7-382510863d4e	tier-upgrade-1769380460381	f93f34bd-316f-44c2-b4a1-76431aec4013	standard	airtel_money	50.00	USD	pending	{"name": "Fusion Mining Limited", "phoneNumber": "+260 97 123 4567"}	\N	2026-01-26 00:34:29.224238	\N	\N	\N	2026-01-26 00:34:29.224238	2026-01-26 00:34:29.224238	50.00	\N
87e62fe7-8874-4cb5-9409-68f616f52f8f	tier-upgrade-1769381652185	f93f34bd-316f-44c2-b4a1-76431aec4013	standard	airtel_money	50.00	USD	paid	{"name": "Fusion Mining Limited", "phoneNumber": "+260 97 123 4567"}	/attached_assets/files/uploads/verification/1769381689317-hu.jpg	2026-01-26 00:54:35.569275	\N	\N	\N	2026-01-26 00:54:35.569275	2026-01-25 22:54:49.811	50.00	\N
71d4aef1-3d80-4a56-b071-3157a2722cbb	tier-upgrade-1769382235030	f93f34bd-316f-44c2-b4a1-76431aec4013	standard	airtel_money	50.00	USD	paid	{"name": "Fusion Mining Limited", "phoneNumber": "+260 97 123 4567"}	/attached_assets/files/uploads/verification/1769382265817-hu.jpg	2026-01-26 01:04:11.061502	\N	\N	\N	2026-01-26 01:04:11.061502	2026-01-25 23:04:26.138	50.00	\N
36600e65-5582-49f6-b097-e731307b3b48	tier-upgrade-1769391400180	f93f34bd-316f-44c2-b4a1-76431aec4013	standard	airtel_money	50.00	USD	paid	{"name": "Fusion Mining Limited", "qrCode": "/attached_assets/files/payments/wechat_qr.jpg", "phoneNumber": "+260 97 123 4567"}	/attached_assets/files/uploads/verification/1769391465911-yan.jpg	2026-01-26 03:37:30.769792	\N	\N	\N	2026-01-26 03:37:30.769792	2026-01-26 01:37:46.266	50.00	\N
6f7283b6-10bc-49da-9ec4-d07d7bdead92	3b701137-3e45-43ae-b517-04c086fbc238	user_372qZRqve6OwjXFHApeUGnXF17p	standard	wechat_alipay	50.00	USD	paid	{"alipayId": "fusionmining@alipay.com", "wechatId": "fusionmining_zambia", "alipayQrCode": "/attached_assets/files/payments/alipay_qr.jpg", "wechatQrCode": "/attached_assets/files/payments/wechat_qr.jpg"}	/attached_assets/files/uploads/verification/1769443043746-Hu_ID.pdf	2026-01-26 17:57:09.051798	\N	\N	\N	2026-01-26 17:57:09.051798	2026-01-26 15:57:23.752	50.00	\N
33ba252a-ec1b-430d-a105-f828c65b9af3	3b701137-3e45-43ae-b517-04c086fbc238	user_372qZRqve6OwjXFHApeUGnXF17p	standard	wechat_alipay	50.00	USD	paid	{"alipayId": "fusionmining@alipay.com", "wechatId": "fusionmining_zambia", "alipayQrCode": "/attached_assets/files/payments/alipay_qr.jpg", "wechatQrCode": "/attached_assets/files/payments/wechat_qr.jpg"}	/attached_assets/files/uploads/verification/1769443994461-Zhang_sign.jpg	2026-01-26 18:13:06.035265	\N	\N	\N	2026-01-26 18:13:06.035265	2026-01-26 16:13:14.466	50.00	\N
a3016071-510f-4924-b72f-c3e190297731	3b701137-3e45-43ae-b517-04c086fbc238	user_372qZRqve6OwjXFHApeUGnXF17p	standard	wechat_alipay	50.00	USD	paid	{"alipayId": "fusionmining@alipay.com", "wechatId": "fusionmining_zambia", "alipayQrCode": "/attached_assets/files/payments/alipay_qr.jpg", "wechatQrCode": "/attached_assets/files/payments/wechat_qr.jpg"}	/attached_assets/files/uploads/verification/1769444341272-Form3_with_ID_s.pdf	2026-01-26 18:18:50.939795	\N	\N	\N	2026-01-26 18:18:50.939795	2026-01-26 16:19:01.289	50.00	\N
\.


--
-- Data for Name: tier_upgrade_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tier_upgrade_requests (id, user_id, requested_tier, status, rejection_reason, submitted_at, reviewed_at, reviewed_by, document_count, created_at, updated_at) FROM stdin;
3b701137-3e45-43ae-b517-04c086fbc238	user_372qZRqve6OwjXFHApeUGnXF17p	standard	approved	\N	2026-01-26 16:19:01.299	2026-01-26 20:09:42.445	\N	0	2026-01-26 14:22:21.019389	2026-01-26 20:09:42.445
\.


--
-- Data for Name: tier_usage_tracking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tier_usage_tracking (id, user_id, month, active_rfqs_count, messages_count, analytics_views, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: two_factor_auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.two_factor_auth (id, user_id, enabled, secret, backup_codes, last_used, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profiles (id, user_id, profile_type, company_name, phone_number, location, bio, interests, verified, created_at, updated_at) FROM stdin;
9dd94b32-fdd1-4c73-a894-4e654c60d00d	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-10-23 13:09:28.883321	2025-10-23 13:09:28.883321
5cfd146c-cd22-42c1-9db4-b21e948ee4c8	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-10-23 14:24:13.545793	2025-10-23 14:24:13.545793
802a9ffa-7626-4900-a520-aefde18e1bea	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-10-23 14:38:31.533928	2025-10-23 14:38:31.533928
632f0c8d-9542-4b93-a824-bc7c8d0896a7	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-11-03 12:28:51.618449	2025-11-03 12:28:51.618449
24089007-bcef-410c-b91c-6243d4c5e45d	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-11-03 12:34:24.097898	2025-11-03 12:34:24.097898
298d9e85-c7d7-454e-bc37-15d18011e4d7	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-11-03 13:30:51.399388	2025-11-03 13:30:51.399388
811c1c7a-9281-44ed-9df8-2061aa29acf9	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-11-03 13:33:44.075584	2025-11-03 13:33:44.075584
75b368a4-98ab-4a9e-8cd2-d8ecd9354d52	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-12-08 11:35:38.32049	2025-12-08 11:35:38.32049
b9e6aed4-b38c-48c9-9691-14f6018417c3	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2025-12-08 13:12:27.279519	2025-12-08 13:12:27.279519
4040312a-2f4c-403f-9ad3-6083d8a0ca3e	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-10-23 13:09:28.880255	2025-10-23 13:09:28.880255
bfb8c976-0cd3-481a-a994-b7f0e8397321	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-10-23 14:24:13.53849	2025-10-23 14:24:13.53849
d7e98a47-392e-4fe6-8c62-cc36e7898fc7	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-10-23 14:38:31.529132	2025-10-23 14:38:31.529132
e0c3e877-05d3-43f6-b452-000dd0e2f20a	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-11-03 12:28:51.614493	2025-11-03 12:28:51.614493
0fcd2d63-4883-4a14-a110-f0ce505e0506	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-11-03 12:34:24.093021	2025-11-03 12:34:24.093021
2bcaed0a-5c32-417f-982d-cf3afba98319	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-11-03 13:30:51.395906	2025-11-03 13:30:51.395906
dfd3db4e-9247-4ebb-a9a6-e977fc9fc642	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-11-03 13:33:44.071357	2025-11-03 13:33:44.071357
d163f8d7-cc5e-4b26-a487-ba23bdeb4d4b	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-12-08 11:35:38.317087	2025-12-08 11:35:38.317087
7c584b67-9955-4cc8-ba12-94ad77c93daf	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2025-12-08 13:12:27.273914	2025-12-08 13:12:27.273914
c407128e-1917-4118-8fe6-324d4f7164a5	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-24 11:10:57.540583	2026-01-24 11:10:57.540583
136fd66a-22a5-45d6-8713-3fc3593d038c	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-24 12:27:54.325407	2026-01-24 12:27:54.325407
881cc55b-e0ab-4d39-8f00-a41651a1cef5	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-24 12:27:54.328762	2026-01-24 12:27:54.328762
374d3b8c-2f6b-4a62-b6ff-92317a863a03	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-25 23:21:09.92219	2026-01-25 23:21:09.92219
549f71b7-d676-4de8-8915-118da0a3ab3e	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-25 23:21:09.925234	2026-01-25 23:21:09.925234
c6eee725-67b8-4c65-b9fa-e54e58825ee7	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 01:07:46.297442	2026-01-26 01:07:46.297442
d5cf08b8-453f-4312-b91f-4eec1d93af43	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 01:07:46.299637	2026-01-26 01:07:46.299637
77b06231-7792-46bf-8905-090b7ec34a89	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 01:31:56.894478	2026-01-26 01:31:56.894478
bb8606b7-5a41-494f-8c87-1f0287b6e999	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 01:31:56.897919	2026-01-26 01:31:56.897919
893781bb-2a5a-474b-88b6-c9fa898a5c6f	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 01:33:45.611624	2026-01-26 01:33:45.611624
79d7f3f2-d62e-42f8-b416-4b480a5b43de	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 01:33:45.61425	2026-01-26 01:33:45.61425
7a198d40-2353-428e-8c9c-1788bd40f0af	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 03:29:06.949812	2026-01-26 03:29:06.949812
a4be1a74-9748-431d-86ac-0eeb658dfe32	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 03:29:06.952546	2026-01-26 03:29:06.952546
8243d3d6-5f0c-4b1e-9e62-c4cf4c7bf01a	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 03:34:33.390715	2026-01-26 03:34:33.390715
25b89073-7bf0-4863-89f1-893af727b8fe	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 03:34:33.393546	2026-01-26 03:34:33.393546
b520eb65-f81e-4b20-b912-bc4225d6d614	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 03:43:57.786652	2026-01-26 03:43:57.786652
c988c2c3-924b-4696-ba9d-7672c1850816	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 03:43:57.78929	2026-01-26 03:43:57.78929
f095b1bf-b187-42e8-be50-e012087cf61f	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 03:44:21.216193	2026-01-26 03:44:21.216193
b257cb3e-10dd-4d04-8847-cdbaf9ed22ae	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 03:44:21.219072	2026-01-26 03:44:21.219072
52b58898-4306-473a-b278-94cf797adb5d	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-26 14:26:01.550838	2026-01-26 14:26:01.550838
c7a720ee-3e8e-41bd-b3d7-31a6269fd1fe	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-26 14:26:01.557976	2026-01-26 14:26:01.557976
43e83b08-60ad-476c-a070-d47ee46b628c	e0167fe5-a82a-46a9-b76d-77dbf049ff2b	individual	\N	\N	\N	\N	\N	f	2026-01-26 18:16:54.483445	2026-01-26 18:16:54.483445
bdf025b2-b5a8-4b94-bbdd-0c4d2586514c	e0167fe5-a82a-46a9-b76d-77dbf049ff2b	individual	\N	\N	\N	\N	\N	f	2026-01-26 18:16:54.767854	2026-01-26 18:16:54.767854
0600096c-12d4-4005-aa98-d0b216b675cc	b72d6aee-8b06-4d7a-958b-6bac6291bf60	individual	\N	\N	\N	\N	\N	f	2026-01-26 23:22:37.610466	2026-01-26 23:22:37.610466
74198da8-2ea2-4c6f-9362-7aa7f47fc6f7	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:40:57.663077	2026-01-27 00:40:57.663077
9b6b8e9b-b6b5-43a8-941c-abc69c09defe	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:40:59.309571	2026-01-27 00:40:59.309571
97fc5666-370c-4eb3-b22b-83271a8a8d39	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:41:00.724776	2026-01-27 00:41:00.724776
b7f4fb52-345b-4e50-b206-a0ec827de966	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:53:59.495193	2026-01-27 00:53:59.495193
73e9dd84-f7a0-416c-874e-c01a0f7929d1	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:55:26.699905	2026-01-27 00:55:26.699905
d8d27f39-62a5-46f3-ab52-9ded7c553d69	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:55:27.119359	2026-01-27 00:55:27.119359
419ad2d4-65fa-44d7-af94-25db46e04a38	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:55:27.48892	2026-01-27 00:55:27.48892
3fb970f1-5255-40e4-9eab-af28318c859c	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:55:27.762298	2026-01-27 00:55:27.762298
a946f46e-3c19-4db0-b8eb-f403203c31a6	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:55:28.105806	2026-01-27 00:55:28.105806
b61ea420-bf68-4d87-aa38-b061ff1c198d	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:15.365935	2026-01-27 00:57:15.365935
046719ad-ea5e-42e7-932c-f2cae2c3610a	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:15.722688	2026-01-27 00:57:15.722688
cb5178d3-a93f-40f6-8643-1b43262e8374	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:22.643731	2026-01-27 00:57:22.643731
919db999-05e9-4ee6-ae36-6c6dcf95454d	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:23.843106	2026-01-27 00:57:23.843106
f97d4d4d-f2ce-42b8-8ecd-65425ae4a96a	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:25.077543	2026-01-27 00:57:25.077543
6c60543b-fb7e-4e4a-b928-e83bc01a58f9	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:25.455956	2026-01-27 00:57:25.455956
a781d6ab-f681-4e9e-b37f-28e0d12e5ddc	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:25.894703	2026-01-27 00:57:25.894703
fcbaa982-1526-45c2-93c2-e454a92d04c9	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:28.834587	2026-01-27 00:57:28.834587
addefd8c-8cf9-4d32-a78c-db836aac207e	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:33.837238	2026-01-27 00:57:33.837238
7e759c9e-e20f-41db-8d18-d8a03c47046b	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:36.069107	2026-01-27 00:57:36.069107
2be4cb6e-4e16-487c-bd30-54e956648363	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:36.453614	2026-01-27 00:57:36.453614
1e934d21-0242-49eb-bbd0-98b48385a88c	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 00:57:36.802954	2026-01-27 00:57:36.802954
50fbef68-3b11-442f-bdc6-ee297c272638	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:03:44.902323	2026-01-27 01:03:44.902323
a98d6f58-4ea8-42cc-bb98-094dd8b1e228	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:03:45.474645	2026-01-27 01:03:45.474645
3a322d40-9dc0-4c35-bc65-44c1c54471f2	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:03:45.937764	2026-01-27 01:03:45.937764
192d80c3-72a1-4709-a89c-72f3df42ea71	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:03:46.1032	2026-01-27 01:03:46.1032
fcf87590-0262-48e9-8c96-bb313c29bfe1	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:03:46.552237	2026-01-27 01:03:46.552237
667ae431-7561-416b-a8a6-9142e471877f	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:04:24.460902	2026-01-27 01:04:24.460902
9ef92e09-d9c9-446c-9999-6be03807b8ad	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:04:24.873525	2026-01-27 01:04:24.873525
8098cb23-dbfa-4eb4-9076-8c7a3c59e740	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:04:25.253275	2026-01-27 01:04:25.253275
d5f1da79-c073-45eb-a943-6481dd70a544	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:04:25.420794	2026-01-27 01:04:25.420794
f3e5a0d8-8168-467f-8cf5-43309dda3c37	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:04:25.579017	2026-01-27 01:04:25.579017
38bdacea-6c1b-4fc5-9b6e-57ced66549d4	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:20:04.339744	2026-01-27 01:20:04.339744
dc533ede-a813-4b1d-9815-82ca849fd793	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:20:04.871727	2026-01-27 01:20:04.871727
b739feef-5d34-4e6d-b2fe-9c71f1100627	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:20:05.225752	2026-01-27 01:20:05.225752
a04f08a4-16cc-4b0a-abc8-c8fc72500392	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:20:05.576338	2026-01-27 01:20:05.576338
02ab8728-1311-4261-b010-095f678a7c80	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:20:06.05963	2026-01-27 01:20:06.05963
81a3c733-9943-483c-b302-356fe960ba1b	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:08.543277	2026-01-27 01:21:08.543277
3c46b524-6084-4f14-9abc-976622f0f455	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:09.67874	2026-01-27 01:21:09.67874
dd0c445e-a73c-4c11-9ff0-f13ff990dedd	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:09.715192	2026-01-27 01:21:09.715192
7106a6d7-a658-4d79-90d3-2596ab656e05	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:10.078859	2026-01-27 01:21:10.078859
66840668-aa39-4e21-be22-7dc6948c2758	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:10.483844	2026-01-27 01:21:10.483844
fdd1e243-128f-4c7b-b7ad-f6c8357da685	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:36.140828	2026-01-27 01:21:36.140828
236419de-bd19-47ec-81e9-1aefd9dc7575	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:36.584608	2026-01-27 01:21:36.584608
5cc670b7-a788-45e7-88f5-0bf093ff93bd	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:36.948112	2026-01-27 01:21:36.948112
2ed5c9c4-af78-4a1f-b7e6-7c68f5d19d94	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:37.260366	2026-01-27 01:21:37.260366
122413a7-180b-4932-83e4-bafb923c1a09	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:21:38.061667	2026-01-27 01:21:38.061667
2c655cf8-9daf-467f-81b0-acec27ed933d	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:04.710123	2026-01-27 01:30:04.710123
e75a1bd5-45f0-4d80-bb66-ed532039eac8	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:05.248336	2026-01-27 01:30:05.248336
6633fc83-4af6-42e2-8e0c-d2f4ec500e31	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:05.830359	2026-01-27 01:30:05.830359
f084a31d-863f-4a0a-8985-bda9f9591e11	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:06.062037	2026-01-27 01:30:06.062037
79103f69-974b-47ee-9055-11fe23fe5c61	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:06.188583	2026-01-27 01:30:06.188583
c1773582-6634-4a5f-a5dc-62b83f86b00a	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:06.532806	2026-01-27 01:30:06.532806
5e92313d-f911-42ff-a591-dd09d3f817d0	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:27.827289	2026-01-27 01:30:27.827289
e6653756-d280-473e-8a84-bdbfecce4848	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:28.459268	2026-01-27 01:30:28.459268
1c777660-bde1-4fd6-a190-19089ddc2139	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:28.844008	2026-01-27 01:30:28.844008
5dba8230-66e0-453b-8d8d-917d1c37657f	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:29.187101	2026-01-27 01:30:29.187101
6c8a5046-fbaf-4590-9d9c-3e19697854b3	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:29.373651	2026-01-27 01:30:29.373651
1f92e879-de3a-41bd-8557-6edd6aa11776	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:30:29.519612	2026-01-27 01:30:29.519612
a080a59e-0706-4f80-b000-a20f04cc1272	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:41:46.823801	2026-01-27 01:41:46.823801
74902f16-9786-4d85-abc3-1d739bd9ea86	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:41:47.476798	2026-01-27 01:41:47.476798
bc04c59a-4d87-461f-bd9b-e14d151c01cb	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:41:47.786639	2026-01-27 01:41:47.786639
8cfee88a-b77d-46c8-8c81-e414e27447c7	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:41:47.823171	2026-01-27 01:41:47.823171
9a07af8e-e626-44d8-8c3b-9fa0270d3d2e	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:41:48.164813	2026-01-27 01:41:48.164813
91978c80-9511-421c-b306-3851bb45ebc0	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:19.18308	2026-01-27 01:42:19.18308
e2c54ec1-ed9c-4c2a-9ce9-2cbc830e2b0c	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:19.596548	2026-01-27 01:42:19.596548
7c0bd1d4-af50-4144-9fba-3ccfea071064	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:19.948929	2026-01-27 01:42:19.948929
ee5893de-a1de-4349-b505-0c40af01f5dc	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:20.216805	2026-01-27 01:42:20.216805
26ed7ff3-f444-427a-b147-4f133d59587d	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:20.558262	2026-01-27 01:42:20.558262
acd8cb59-b8bc-4349-889d-e97253d68c5e	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:52.148815	2026-01-27 01:42:52.148815
5c374295-bae4-42bf-a700-68ee84ca85bf	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:52.553851	2026-01-27 01:42:52.553851
e7aeab86-780e-4897-b2a0-e70e500826e6	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:52.861988	2026-01-27 01:42:52.861988
d2d3a677-d7f4-4bf0-b83d-5ade9f2ef2e7	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:53.074839	2026-01-27 01:42:53.074839
0e7c409e-16c4-45aa-9a6c-a404cb878d3e	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:42:53.407434	2026-01-27 01:42:53.407434
7481a2ff-e665-496f-b027-32d43a007d26	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:59:17.466217	2026-01-27 01:59:17.466217
3fc885ae-7c5a-414a-8b66-249aff3f5167	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:59:18.15516	2026-01-27 01:59:18.15516
6cd57d03-84fb-49ce-94a0-9c235efde75c	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:59:18.502369	2026-01-27 01:59:18.502369
61e0f034-1e88-4c26-8ef0-62e5e7892b62	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:59:18.503081	2026-01-27 01:59:18.503081
323563d7-7cce-4b03-ad96-e5c665e2d60e	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 01:59:18.838515	2026-01-27 01:59:18.838515
e53c1bb5-8dfa-45ed-b014-86aa9f4af081	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:41:55.926183	2026-01-27 03:41:55.926183
04b0e8a6-dc49-4bd7-8209-a3e3ccf8f3f2	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:41:59.530776	2026-01-27 03:41:59.530776
7a1eb6c4-15e9-4d20-9397-c1c757fbaa7a	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:42:12.050201	2026-01-27 03:42:12.050201
d8d9bc58-5769-4663-b429-bf3c3d0512c5	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:42:14.020792	2026-01-27 03:42:14.020792
26409002-cd9d-4ddc-b26b-0f25ed7589e6	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:42:28.658149	2026-01-27 03:42:28.658149
5a400399-f331-4209-bf8a-bb78f9a571c0	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:42:35.759719	2026-01-27 03:42:35.759719
e8906d40-32f7-4d67-b100-2a2d6d7b039b	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:42:51.27848	2026-01-27 03:42:51.27848
4f1022ea-a128-45ea-9cd7-efc83b29ba5e	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:42:53.473994	2026-01-27 03:42:53.473994
c1bfb539-ac6e-4d54-8318-55bda87a8956	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:46:39.962218	2026-01-27 03:46:39.962218
f13b8639-30ea-4762-bf9e-0002a3868c0a	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:46:40.878723	2026-01-27 03:46:40.878723
af5fbd1b-ff60-4c26-9ba9-3958b8d3ae26	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:47:11.239981	2026-01-27 03:47:11.239981
b7260bef-cfd6-4a0f-a669-34ebeebb006b	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:47:13.111546	2026-01-27 03:47:13.111546
c296f3df-d7f1-49a7-940f-cc4fda84eadf	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:48:49.444254	2026-01-27 03:48:49.444254
419fca39-ba86-4aa3-be20-4ceb6cd6766c	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:49:17.176628	2026-01-27 03:49:17.176628
324083b1-f98d-486b-b9be-c8b6c54b7129	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 03:49:19.001947	2026-01-27 03:49:19.001947
5d4ec221-261f-4f19-b1e6-ba5eeca7b1e0	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:34:46.970666	2026-01-27 10:34:46.970666
3e448ccf-ee8a-4275-bb78-68d7fae910d3	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:34:50.407414	2026-01-27 10:34:50.407414
f7ceae5b-6bfc-4655-878c-d972b4f4fe61	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:34:56.920842	2026-01-27 10:34:56.920842
e737d388-911f-4275-8130-490972d6fc73	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:35:17.102767	2026-01-27 10:35:17.102767
dd6a0f48-a716-4544-8d18-a9ab48e17b0b	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:35:19.170132	2026-01-27 10:35:19.170132
eeaadb3f-a2ce-430f-97af-3c8a814eacd5	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:37:33.756092	2026-01-27 10:37:33.756092
5eb49632-3598-4a12-bb69-570f6f8c96af	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:43:25.487557	2026-01-27 10:43:25.487557
75d0f9f3-386b-4fac-9410-8df3e8de8614	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:43:30.235596	2026-01-27 10:43:30.235596
571481ae-b5e2-4da7-97ff-32c6652cca08	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:43:41.462231	2026-01-27 10:43:41.462231
44137b98-4eb3-4189-bf88-1a8185cad08f	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:43:57.205768	2026-01-27 10:43:57.205768
f8261ae0-ecf7-44a5-a948-5eed7fbd4497	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:43:58.98816	2026-01-27 10:43:58.98816
dc65c0f6-c705-4743-8ade-f5a2aef6cd29	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:46:42.593462	2026-01-27 10:46:42.593462
6aeeb856-762c-488c-a27f-04c92909e9da	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:46:44.301165	2026-01-27 10:46:44.301165
ce20d096-c99c-4977-a522-6640497ec2e3	f93f34bd-316f-44c2-b4a1-76431aec4013	individual	\N	\N	\N	\N	\N	f	2026-01-27 10:48:40.460833	2026-01-27 10:48:40.460833
29d12d66-7d3d-44c2-9258-b25b6a80b5ff	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-27 14:26:51.934088	2026-01-27 14:26:51.934088
26e588fc-ae55-4508-85c0-5f0438501032	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-27 14:26:51.936709	2026-01-27 14:26:51.936709
4a0e2449-195d-4e6a-b0d7-f29134676b56	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-27 14:42:00.079206	2026-01-27 14:42:00.079206
3a98a52c-c94c-41b7-b87f-7407c8570795	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-27 14:42:00.082229	2026-01-27 14:42:00.082229
868d327d-611c-4acf-8b93-bb80d14b9db9	test-seller-456	company	Copper Valley Mining Co.	+260 97 123 4567	Kitwe, Copperbelt	Leading copper extraction company with 15 years of experience in Zambia's mining sector.	{Copper,Cobalt,"Mining Equipment"}	t	2026-01-27 14:42:36.777096	2026-01-27 14:42:36.777096
615feea1-2428-412b-93b7-01ca641ed13b	test-buyer-789	company	Global Minerals Trading Ltd	+260 96 987 6543	Lusaka, Zambia	International mineral trading company looking for quality Zambian minerals.	{Emeralds,Copper,Gold}	t	2026-01-27 14:42:36.779362	2026-01-27 14:42:36.779362
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, first_name, last_name, profile_image_url, role, created_at, updated_at, username, password, membership_tier, verification_status, badge_color, clerk_id) FROM stdin;
test-admin-123	admin@fusionmining.com	Admin	User	\N	admin	2025-10-23 13:09:28.861341	2025-10-23 13:09:28.861341	\N	\N	basic	not_requested	\N	\N
test-admin-super	superadmin@fusionmining.com	Super	Admin	\N	admin	2025-12-02 10:47:30.001788	2026-01-26 20:45:39.116	superadmin	$2b$10$demo	premium	approved	\N	\N
b72d6aee-8b06-4d7a-958b-6bac6291bf60	lytoneterro123@gmail.com	Lytone	Chibona	\N	buyer	2026-01-26 23:22:37.605893	2026-01-26 23:22:37.605893	\N	\N	basic	not_requested	\N	user_38ncz9nvJ3O0VQ9yB0x1f1ggtgO
test-admin-verification	verifyadmin@fusionmining.com	Verification	Admin	\N	admin	2025-12-02 10:47:30.021507	2025-12-02 10:55:35.430116	verifyadmin	$2b$10$demo	basic	approved	\N	\N
test-admin-content	contentadmin@fusionmining.com	Content	Admin	\N	admin	2025-12-02 10:47:30.035579	2025-12-02 10:55:35.432552	contentadmin	$2b$10$demo	basic	approved	\N	\N
test-admin-support	supportadmin@fusionmining.com	Support	Admin	\N	admin	2025-12-02 10:47:30.050944	2025-12-02 10:55:35.434519	supportadmin	$2b$10$demo	basic	approved	\N	\N
e0167fe5-a82a-46a9-b76d-77dbf049ff2b	innovareadvi@gmail.com	Innovare	adv	\N	admin	2026-01-26 18:16:54.48007	2026-01-26 16:16:54.765	\N	\N	basic	not_requested	\N	user_372taeZATY3yoBSYE1xdbMgtlN6
f93f34bd-316f-44c2-b4a1-76431aec4013	lytonechibona@gmail.com	Lytone	Chibona	\N	admin	2026-01-24 11:10:57.532404	2026-01-27 08:48:40.452	\N	\N	basic	not_requested	\N	user_38oVAWKblfh1j2sQGOYZYeisiEY
test-buyer-789	henry@fusionmining.com	Henry	Pass	\N	buyer	2025-10-23 13:09:28.87872	2025-12-09 08:49:00.251	henry	\N	standard	not_requested	\N	\N
test-seller-456	ray@fusionmining.com	Ray	Pass	\N	seller	2025-10-23 13:09:28.87743	2025-12-02 10:55:35.440856	ray	\N	basic	approved	\N	\N
test-admin-analytics	analyticsadmin@fusionmining.com	Analytics	Admin	\N	admin	2025-12-02 10:47:30.070808	2025-12-09 08:49:56.388	analyticsadmin	$2b$10$demo	basic	approved	\N	\N
\.


--
-- Data for Name: verification_queue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification_queue (id, listing_id, submitted_at, reviewed_at, reviewed_by, notes) FROM stdin;
94f5cf95-2471-4bea-b021-fc68bd4d901e	d4e5b946-56d5-4f52-b716-ddfbffe53fb1	2025-10-30 12:47:44.398737	2025-10-30 10:48:25.451	test-admin-123	\N
\.


--
-- Data for Name: verification_rules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification_rules (id, rule_name, description, required_for, document_types, min_documents, auto_approve, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, title, description, video_url, thumbnail_url, duration, active, created_at, updated_at) FROM stdin;
d7436e3c-582d-4f8c-93c2-1228b0416e86	Gold Mining	Gold Mining In zamibia	https://youtu.be/fO7MOysiWxE?si=URBOhg7FrqVim99S		2:02	t	2025-10-27 14:52:46.490385	2025-10-27 14:52:46.490385
\.


--
-- Name: admin_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_permissions_id_seq', 7, true);


--
-- Name: tier_usage_tracking UNQ_user_month; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tier_usage_tracking
    ADD CONSTRAINT "UNQ_user_month" UNIQUE (user_id, month);


--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: admin_audit_logs admin_audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_audit_logs
    ADD CONSTRAINT admin_audit_logs_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions admin_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: buyer_requests buyer_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buyer_requests
    ADD CONSTRAINT buyer_requests_pkey PRIMARY KEY (id);


--
-- Name: contact_settings contact_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_settings
    ADD CONSTRAINT contact_settings_pkey PRIMARY KEY (id);


--
-- Name: contact_submissions contact_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_submissions
    ADD CONSTRAINT contact_submissions_pkey PRIMARY KEY (id);


--
-- Name: document_templates document_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document_templates
    ADD CONSTRAINT document_templates_pkey PRIMARY KEY (id);


--
-- Name: email_templates email_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_templates
    ADD CONSTRAINT email_templates_pkey PRIMARY KEY (id);


--
-- Name: email_templates email_templates_template_key_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_templates
    ADD CONSTRAINT email_templates_template_key_unique UNIQUE (template_key);


--
-- Name: express_interest express_interest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.express_interest
    ADD CONSTRAINT express_interest_pkey PRIMARY KEY (id);


--
-- Name: login_history login_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_history
    ADD CONSTRAINT login_history_pkey PRIMARY KEY (id);


--
-- Name: marketplace_listings marketplace_listings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marketplace_listings
    ADD CONSTRAINT marketplace_listings_pkey PRIMARY KEY (id);


--
-- Name: membership_benefits membership_benefits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_benefits
    ADD CONSTRAINT membership_benefits_pkey PRIMARY KEY (id);


--
-- Name: message_idempotency message_idempotency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_idempotency
    ADD CONSTRAINT message_idempotency_pkey PRIMARY KEY (id);


--
-- Name: message_templates message_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_templates
    ADD CONSTRAINT message_templates_pkey PRIMARY KEY (id);


--
-- Name: message_threads message_threads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_threads
    ADD CONSTRAINT message_threads_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: payment_method_details payment_method_details_method_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method_details
    ADD CONSTRAINT payment_method_details_method_unique UNIQUE (method);


--
-- Name: payment_method_details payment_method_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method_details
    ADD CONSTRAINT payment_method_details_pkey PRIMARY KEY (id);


--
-- Name: platform_settings platform_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platform_settings
    ADD CONSTRAINT platform_settings_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: seller_verification_documents seller_verification_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seller_verification_documents
    ADD CONSTRAINT seller_verification_documents_pkey PRIMARY KEY (id);


--
-- Name: seller_verification_requests seller_verification_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seller_verification_requests
    ADD CONSTRAINT seller_verification_requests_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: settings_audit settings_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings_audit
    ADD CONSTRAINT settings_audit_pkey PRIMARY KEY (id);


--
-- Name: sustainability_content sustainability_content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sustainability_content
    ADD CONSTRAINT sustainability_content_pkey PRIMARY KEY (id);


--
-- Name: tier_upgrade_payments tier_upgrade_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tier_upgrade_payments
    ADD CONSTRAINT tier_upgrade_payments_pkey PRIMARY KEY (id);


--
-- Name: tier_upgrade_requests tier_upgrade_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tier_upgrade_requests
    ADD CONSTRAINT tier_upgrade_requests_pkey PRIMARY KEY (id);


--
-- Name: tier_usage_tracking tier_usage_tracking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tier_usage_tracking
    ADD CONSTRAINT tier_usage_tracking_pkey PRIMARY KEY (id);


--
-- Name: two_factor_auth two_factor_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.two_factor_auth
    ADD CONSTRAINT two_factor_auth_pkey PRIMARY KEY (id);


--
-- Name: two_factor_auth two_factor_auth_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.two_factor_auth
    ADD CONSTRAINT two_factor_auth_user_id_unique UNIQUE (user_id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verification_queue verification_queue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_queue
    ADD CONSTRAINT verification_queue_pkey PRIMARY KEY (id);


--
-- Name: verification_rules verification_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_rules
    ADD CONSTRAINT verification_rules_pkey PRIMARY KEY (id);


--
-- Name: verification_rules verification_rules_rule_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_rules
    ADD CONSTRAINT verification_rules_rule_name_unique UNIQUE (rule_name);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: IDX_settings_audit_changed_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_settings_audit_changed_at" ON public.settings_audit USING btree (changed_at);


--
-- Name: IDX_settings_audit_changed_by; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_settings_audit_changed_by" ON public.settings_audit USING btree (changed_by);


--
-- Name: IDX_settings_audit_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_settings_audit_key" ON public.settings_audit USING btree (setting_key);


--
-- Name: express_interest express_interest_listing_id_marketplace_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.express_interest
    ADD CONSTRAINT express_interest_listing_id_marketplace_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.marketplace_listings(id) ON DELETE CASCADE;


--
-- Name: express_interest express_interest_project_id_projects_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.express_interest
    ADD CONSTRAINT express_interest_project_id_projects_id_fk FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: message_idempotency message_idempotency_message_id_messages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_idempotency
    ADD CONSTRAINT message_idempotency_message_id_messages_id_fk FOREIGN KEY (message_id) REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: message_threads message_threads_buyer_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_threads
    ADD CONSTRAINT message_threads_buyer_id_users_id_fk FOREIGN KEY (buyer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: message_threads message_threads_listing_id_marketplace_listings_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_threads
    ADD CONSTRAINT message_threads_listing_id_marketplace_listings_id_fk FOREIGN KEY (listing_id) REFERENCES public.marketplace_listings(id) ON DELETE CASCADE;


--
-- Name: message_threads message_threads_project_id_projects_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_threads
    ADD CONSTRAINT message_threads_project_id_projects_id_fk FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: message_threads message_threads_seller_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_threads
    ADD CONSTRAINT message_threads_seller_id_users_id_fk FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: messages messages_thread_id_message_threads_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_thread_id_message_threads_id_fk FOREIGN KEY (thread_id) REFERENCES public.message_threads(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict ZVerWQr7ypL0yH9wvZmbskwD3DQlaALtLaj0fC1prh6YRM59NXMniyuA0wcOYtQ

