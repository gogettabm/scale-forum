# Web Development Final Project - *Scale*

Submitted by: **Brayan Moafo**

This web app: **Scale is a forum for discussing the climate crisis at every level of impact. The core idea is that climate change isn't one story — it's the same story at different zoom levels. Every post is tagged with the scale of impact it discusses (🌍 Global, 🏛️ National, 🏙️ Regional, 📍 Local), and the feed can be filtered by scale so you can trace how a planetary trend cascades down to someone's flooded street. Users can create, read, update, and delete posts, upvote them, search and sort the feed, and discuss in the comments.**

Time spent: **12** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - [x] Form requires users to add a post title
  - [x] Forms have the *option* for users to add:
    - [x] additional textual content
    - [x] an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - [x] Web app displays previously created posts on the home feed
  - [x] Each post on the home feed shows only the post's **creation time**, **title**, and **upvotes count**
  - [x] Clicking on a post navigates to a separate page for that post
- [x] **Users can view posts in different ways**
  - [x] Users can sort posts by either creation time or upvotes count
  - [x] Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - [x] The app includes a separate post page for each created post, where content, image, and comments are shown
  - [x] Users can leave comments underneath a post on the post page
  - [x] Each post has an upvote button on the post page; each click increases the count by one and users can upvote any number of times
- [x] **A post that a user previously created can be edited or deleted from its post page**
  - [x] After a user creates a new post, they can go back and edit it
  - [x] A previously created post can be deleted from its post page

## Stretch Features

The following **stretch** features are implemented:

- [x] **Web app implements pseudo-authentication**
  - Users can optionally set a secret key when creating a post. If set, that key must be entered to edit or delete the post.
- [x] **Users can add more characteristics to their posts**
  - [x] Users can share and view web videos (YouTube links are auto-converted to embeds)
  - [x] Users can set flags — the **scale of impact** (Global / National / Regional / Local) — while creating a post
  - [x] Users can filter posts by flag on the home feed
- [x] **Whenever data is being fetched, the web app displays a loading animation**
  - An accessible spinner appears while the feed, an individual post, and comments load.

## Web Design Principles

This project applies several web design principles covered in the unit:

- **Visual hierarchy** — the feed leads with the upvote count and title; supporting metadata is deliberately smaller and lower-contrast, so the eye lands on what matters first.
- **Consistency** — one accent color, one shared card pattern, and a single spacing scale across every view; the scale tag uses the same shape and placement everywhere it appears.
- **Color with meaning** — an earthy green/blue palette matches the environmental subject, and each scale has its own consistent hue so users learn the visual language quickly.
- **Accessibility** — semantic headings and landmarks, visible `:focus-visible` outlines for keyboard users, `aria-label`s on the search and comment inputs, a `role="status"` live region on the loader, `prefers-reduced-motion` support, and text/background pairs chosen for contrast.
- **Responsiveness** — the layout, filter bar, and scale picker all reflow on narrow screens.

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Add your GIF here once recorded. GIF created with Kap (https://getkap.co/) -->

## Notes

Built with **React + Vite**, **React Router** for the feed/create/post/edit routes,
and **supabase-js** for all CRUD against two Postgres tables (`posts` and
`comments`, related by a foreign key with `on delete cascade` so deleting a post
cleans up its comments).

Sorting is done in the query itself (`.order(orderBy, { ascending: false })`)
while search and scale filtering are applied client-side over the fetched rows,
which keeps the feed responsive as the user types. Upvotes use an optimistic
update that rolls back if the request fails.

The trickiest part was getting Supabase's row-level security configured — reads
worked immediately but every insert failed until a permissive policy was added
for both tables.

## Getting Started

```bash
npm install
cp .env.example .env   # then fill in your Supabase URL + anon key
npm run dev
```

The database schema:

```sql
create table posts (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  title text not null,
  content text,
  image_url text,
  video_url text,
  scale text default 'Global',
  upvotes int default 0,
  secret_key text
);

create table comments (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  post_id bigint references posts(id) on delete cascade,
  content text not null
);
```

## License

    Copyright 2026 Brayan Moafo

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
