CREATE TABLE `creator_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`display_name` text NOT NULL,
	`email` text NOT NULL,
	`twitter` text,
	`portfolio` text,
	`bio` text,
	`design_samples` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `creators` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`node_id` text NOT NULL,
	`status` text NOT NULL,
	`card_status` text NOT NULL,
	`bio` text,
	`twitter` text,
	`is_online` integer DEFAULT 0 NOT NULL,
	`royalty_tier` text NOT NULL,
	`payout_info` text NOT NULL,
	`role` text DEFAULT 'creator' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `otp_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`code` text NOT NULL,
	`expires_at` text NOT NULL
);
