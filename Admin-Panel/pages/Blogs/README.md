# Blog Management - Usage Guide

## Overview
The blog management system allows admin users to create, view, and manage blog posts (news articles) that appear on the main homepage of the application.

## Features
- ✅ Create new blog posts with rich content
- ✅ Upload cover images for blog posts
- ✅ Auto-generate URL-friendly slugs
- ✅ Publish immediately or save as draft
- ✅ View all blogs with publish status
- ✅ Image upload to Cloudinary via backend API

## How to Use

### Accessing Blog Management
1. Login to the admin panel at `/admin-login`
2. Navigate to "Bloglar" (Blogs) from the sidebar
3. Click "Yeni Blog Ekle" (Add New Blog) button

### Creating a New Blog Post

#### 1. Fill in the Title
- Enter a descriptive title for your blog post
- The slug will be auto-generated from the title
- Example: "Antalya Spor Haberleri 2024" → `antalya-spor-haberleri-2024`

#### 2. Customize the Slug (Optional)
- The slug is the URL-friendly identifier for your blog
- It will be visible in the URL: `/blogs/your-slug-here`
- You can edit the auto-generated slug if needed
- Use only lowercase letters, numbers, and hyphens

#### 3. Write Content
- Enter the full blog content in the text area
- The first 150 characters will be used as a summary on the homepage
- Future enhancement: Add rich text editor for formatting

#### 4. Upload Cover Image
- Click the file input to select an image
- Supported formats: PNG, JPG, GIF
- Maximum file size: 5MB
- The image will be automatically uploaded to Cloudinary
- Preview will be shown after upload
- Click "Kaldır" (Remove) to select a different image

#### 5. Set Publish Status
- Check "Hemen Yayınla" (Publish Immediately) to make the blog live
- Leave unchecked to save as a draft
- Published blogs appear on the homepage
- Drafts are only visible in the admin panel

#### 6. Submit
- Click "Blog Oluştur" (Create Blog) to save
- You'll be redirected to the blog list on success
- Toast notification will confirm successful creation

## API Endpoints Used

### Image Upload
```
POST /api/v1/upload/image/blog
Content-Type: multipart/form-data
Authorization: Bearer <admin_token>

Body: FormData with 'file' field
Response: { url: "cloudinary-url", public_id: "..." }
```

### Create Blog
```
POST /api/v1/admin/blogs
Content-Type: application/json
Authorization: Bearer <admin_token>

Body: {
  title: string,
  slug: string,
  content: string,
  image_url: string (optional),
  is_published: boolean
}
```

### List Blogs
```
GET /api/v1/admin/blogs
Authorization: Bearer <admin_token>

Response: Array of blog objects
```

## Frontend Components

### Files Created/Modified
1. **CreateBlogPage.jsx** - New blog creation form
2. **ListBlogsPage.jsx** - Updated with navigation and proper data mapping
3. **AdminApp.jsx** - Added routing for `/admin/blogs/create`
4. **admin.js** - Added `uploadBlogImage()` function
5. **admin.css** - Added form styling (form-group, form-label, form-input, form-hint)

## Data Flow

1. User selects image → File uploaded to backend
2. Backend uploads to Cloudinary → Returns URL
3. Image URL stored in form state
4. User fills other fields
5. Form submitted → Blog created with image URL
6. Blog appears in list and on homepage (if published)

## Homepage Integration

The blogs are displayed on the homepage using:
- **Home.jsx** - Fetches blogs from `/api/v1/blogs`
- Shows top 3 as slider with cover images
- Displays all as grid below slider
- Each blog links to `/blogs/:id` for full view

## Troubleshooting

### Image Upload Fails
- Check file size (max 5MB)
- Verify file type (must be image/*)
- Check backend Cloudinary configuration
- Verify admin token is valid

### Blog Not Appearing on Homepage
- Check `is_published` is set to `true`
- Verify blog was created successfully
- Check frontend is fetching from correct endpoint
- Verify backend returns published blogs

### Slug Already Exists
- Backend will return error if slug is duplicate
- Try adding date or unique identifier to slug
- Example: `antalya-news` → `antalya-news-2024-11-29`

## Future Enhancements

- [ ] Rich text editor for content formatting
- [ ] Blog edit functionality
- [ ] Blog delete functionality
- [ ] Image gallery for multiple images
- [ ] Categories/tags for blogs
- [ ] SEO metadata fields
- [ ] Preview before publishing
- [ ] Schedule publishing for future date
