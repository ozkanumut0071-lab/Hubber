const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY_USERS = 'mock_users';
const STORAGE_KEY_CURRENT_USER = 'mock_current_user';

const mockUser = {
  id: 'user-1',
  display_name: 'Kampus Kullanici',
  email: 'ogrenci@kampus.edu.tr',
  profile_photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  role: 'student',
};

const mockAdmin = {
  id: 'admin-1',
  display_name: 'Admin Kullanici',
  email: 'admin@kampus.edu.tr',
  profile_photo: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=600&q=80',
  role: 'admin',
  password: 'Admin123!',
  is_banned: false,
  created_at: new Date().toISOString(),
};

const safeLoad = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load from storage', err);
    return fallback;
  }
};

const safeSave = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to storage', err);
  }
};

const ensureDefaults = (list) => {
  const hasAdmin = list.some((u) => u.email === mockAdmin.email);
  const hasUser = list.some((u) => u.email === mockUser.email);
  const next = [...list];
  if (!hasAdmin) next.push(mockAdmin);
  if (!hasUser) next.push(mockUser);
  return next;
};

let users = ensureDefaults(safeLoad(STORAGE_KEY_USERS, [mockAdmin, mockUser]));

const loadCurrentUser = () => {
  const stored = safeLoad(STORAGE_KEY_CURRENT_USER, null);
  if (!stored) return mockUser;
  const found = users.find((u) => u.id === stored.id || u.email === stored.email);
  return found || mockUser;
};

let currentUser = loadCurrentUser();

const persistUsers = (next) => {
  users = ensureDefaults(next);
  safeSave(STORAGE_KEY_USERS, users);
};

const persistCurrentUser = (user) => {
  currentUser = user;
  safeSave(STORAGE_KEY_CURRENT_USER, { id: user.id, email: user.email });
};

const upsertUser = (user) => {
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...user };
  } else {
    users.push(user);
  }
  persistUsers(users);
  persistCurrentUser(user);
  return user;
};

const mockBlogs = [
  {
    id: 1,
    title: 'Spor Haftasi Basladi: Kampuste Etkinlikler',
    image_url: 'https://images.unsplash.com/photo-1521417532722-1202beac9428?auto=format&fit=crop&w=1200&q=80',
    content:
      'Bu hafta kampuste spor haftasi basladi. Tenis, basketbol ve kosu kulubu icin etkinlikler duzenleniyor. Herkes katilabilir ve yeni arkadasliklar kurabilir.',
    author_id: 2,
    published_at: '2024-11-01T10:00:00Z',
    created_at: '2024-11-01T10:00:00Z',
    slug: 'spor-haftasi-basladi',
  },
  {
    id: 2,
    title: 'Yeni Kütüphane Saatleri',
    image_url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
    content:
      'Kampus kutuphanesi yeni saatlere gecti. Hafta ici 08:00 - 23:00, hafta sonu 10:00 - 20:00 arasinda acik olacak.',
    author_id: 3,
    published_at: '2024-11-03T12:30:00Z',
    created_at: '2024-11-03T12:30:00Z',
    slug: 'yeni-kutuphanesaatleri',
  },
  {
    id: 3,
    title: 'Yemekhane Menu Yenilendi',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    content:
      'Bu ay yemekhane menusunde daha dengeli secenekler var. Sebze, bakliyat ve protein agirlikli ogunler ekleniyor.',
    author_id: 4,
    published_at: '2024-11-05T09:15:00Z',
    created_at: '2024-11-05T09:15:00Z',
    slug: 'yemekhane-menu-yenilendi',
  },
  {
    id: 4,
    title: 'Teknoloji Zirvesi Kayitlari Acildi',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    content:
      'Aralik ayinda duzenlenecek olan teknoloji zirvesi icin kayitlar acildi. Sektor liderlerinin konusmalari ve atolyeleri olacak.',
    author_id: 5,
    published_at: '2024-11-08T14:45:00Z',
    created_at: '2024-11-08T14:45:00Z',
    slug: 'teknoloji-zirvesi-kayitlari',
  },
];

const mockForumComments = {
  'post-1': [
    { id: 'c-1', user_id: 2, body: 'Kosu icin kayit nereden yapiliyor?', created_at: '2024-11-02T10:00:00Z' },
    { id: 'c-2', user_id: 3, body: 'Harika fikir, parkur bilgisi var mi?', created_at: '2024-11-02T11:10:00Z' },
  ],
  'post-2': [
    { id: 'c-3', user_id: 4, body: 'Yemekhane menusu bugun cok iyiydi.', created_at: '2024-11-03T13:40:00Z' },
  ],
  'post-3': [
    { id: 'c-4', user_id: 5, body: 'Kutuphanede grup calisma odasi var mi?', created_at: '2024-11-04T09:25:00Z' },
  ],
};

const mockForumPosts = [
  {
    id: 'post-1',
    title: 'Kosu Kulubu Haftalik Antrenman',
    body: 'Pazartesi ve Carsamba gunleri saat 18:30da stadionda kosu antrenmani yapacagiz. Yeni katilanlari bekleriz.',
    category: 'spor',
    image_url: 'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=1200&q=80',
    created_at: '2024-11-02T09:00:00Z',
    user_id: 1,
    score: 12,
    current_user_vote: null,
  },
  {
    id: 'post-2',
    title: 'Yemekhane Degerlendirmesi',
    body: 'Bugun yemekler oldukca lezzetliydi. Onerilerinizi buraya yazabilirsiniz.',
    category: 'yemek',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    created_at: '2024-11-03T12:00:00Z',
    user_id: 2,
    score: 7,
    current_user_vote: null,
  },
  {
    id: 'post-3',
    title: 'Kutuphanede Calisma Saatleri',
    body: 'Sinav donemi icin uzatilan saatler hakkinda goruslerinizi paylasin.',
    category: 'kampus',
    image_url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
    created_at: '2024-11-04T08:30:00Z',
    user_id: 3,
    score: 4,
    current_user_vote: null,
  },
];

const mockMenus = {
  gsb: [
    { day: 'Pazartesi', calories: 820, items: ['Izgara tavuk', 'Pirinc pilavi', 'Coban salata', 'Ayran'] },
    { day: 'Sali', calories: 760, items: ['Et sote', 'Bulgur pilavi', 'Yogurt', 'Mevsim salata'] },
    { day: 'Carsamba', calories: 680, items: ['Mercimek corbasi', 'Izgara kofte', 'Pide', 'Ayran'] },
    { day: 'Persembe', calories: 710, items: ['Tavuk doner', 'Pilav', 'Cacik', 'Helva'] },
    { day: 'Cuma', calories: 690, items: ['Sebze guvec', 'Makarna', 'Kefir', 'Salata'] },
  ],
  kyk: [
    {
      day: 'Pazartesi',
      calories: 720,
      breakfast: ['Zeytin', 'Beyaz peynir', 'Bal', 'Simit', 'Cay'],
      dinner: ['Kuru fasulye', 'Pirinc pilavi', 'Cacik', 'Meyve'],
    },
    {
      day: 'Sali',
      calories: 750,
      breakfast: ['Kasar peynir', 'Domates', 'Salatalik', 'Yumurta', 'Ekmek'],
      dinner: ['Tavuk sote', 'Bulgur pilavi', 'Ayran', 'Sutlac'],
    },
    {
      day: 'Carsamba',
      calories: 700,
      breakfast: ['Recel', 'Tereyagi', 'Haslanmis yumurta', 'Pekmez', 'Ekmek'],
      dinner: ['Izgara kofte', 'Makarna', 'Mevsim salata', 'Ayran'],
    },
    {
      day: 'Persembe',
      calories: 730,
      breakfast: ['Labne', 'Siyah zeytin', 'Simit', 'Domates', 'Cay'],
      dinner: ['Etli nohut', 'Pilav', 'Cacik', 'Meyve'],
    },
    {
      day: 'Cuma',
      calories: 710,
      breakfast: ['Peynir', 'Zeytin', 'Bal kaymak', 'Ekmek', 'Cay'],
      dinner: ['Tavuk izgara', 'Sebzeli kuskus', 'Ayran', 'Helva'],
    },
  ],
};

const randomImage = (seed) =>
  `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80&sig=${seed}`;

export const register = async (userData) => {
  await wait();
  const newUser = {
    id: `user-${Date.now()}`,
    display_name: userData.display_name || 'Kampus Kullanici',
    email: userData.email || `user-${Date.now()}@kampus.edu.tr`,
    profile_photo: mockUser.profile_photo,
    role: 'student',
    is_banned: false,
    created_at: new Date().toISOString(),
  };
  upsertUser(newUser);
  return {
    data: {
      access_token: `mock-token-${newUser.id}`,
      user_id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
    error: null,
  };
};

export const registerAdmin = async () => {
  await wait();
  upsertUser(mockAdmin);
  return {
    data: {
      access_token: 'mock-admin-token',
      user_id: mockAdmin.id,
      email: mockAdmin.email,
      role: mockAdmin.role,
    },
    error: null,
  };
};

export const login = async (email) => {
  await wait();
  if (email === mockAdmin.email) {
    upsertUser(mockAdmin);
    const current = users.find((u) => u.email === mockAdmin.email) || mockAdmin;
    if (current.is_banned) {
      return { data: null, error: new Error('Hesabiniz banlandi.') };
    }
    return {
      data: {
        access_token: 'mock-admin-token',
        user_id: current.id,
        email: current.email,
        role: current.role,
      },
      error: null,
    };
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    if (existing.is_banned) {
      return { data: null, error: new Error('Hesabiniz banlandi.') };
    }
    upsertUser(existing);
    return {
      data: {
        access_token: `mock-token-${existing.id}`,
        user_id: existing.id,
        email: existing.email,
        role: existing.role,
      },
      error: null,
    };
  }

  const created = upsertUser({
    id: `user-${Date.now()}`,
    display_name: email?.split('@')[0] || 'Kampus Kullanici',
    email: email || mockUser.email,
    profile_photo: mockUser.profile_photo,
    role: 'student',
    is_banned: false,
    created_at: new Date().toISOString(),
  });

  return {
    data: {
      access_token: `mock-token-${created.id}`,
      user_id: created.id,
      email: created.email,
      role: created.role,
    },
    error: null,
  };
};

export const getCurrentUser = async () => {
  await wait();
  if (currentUser?.is_banned) {
    return { data: null, error: new Error('Hesabiniz banlandi.') };
  }
  return { data: currentUser, error: null };
};

export const fetchUserProfile = getCurrentUser;

export const updateUserProfile = async (payload) => {
  await wait();
  if (payload?.display_name) {
    const next = { ...currentUser, display_name: payload.display_name };
    upsertUser(next);
  }
  return { data: currentUser, error: null };
};

export const uploadProfilePhoto = async () => {
  await wait();
  const url = randomImage(Date.now());
  const next = { ...currentUser, profile_photo: url };
  upsertUser(next);
  return { data: { profile_photo: url }, error: null };
};

export const logout = async () => {
  await wait();
  safeSave(STORAGE_KEY_CURRENT_USER, null);
  return { data: { message: 'Logged out' }, error: null };
};

export const fetchBlogs = async () => {
  await wait();
  return { data: mockBlogs, error: null };
};

export const fetchBlog = async (id) => {
  await wait();
  const found = mockBlogs.find((b) => String(b.id) === String(id)) || null;
  return { data: found, error: null };
};

export const fetchForumPosts = async (params = {}) => {
  await wait();
  const scopeParam = typeof params === 'string' ? new URLSearchParams(params).get('scope') : params?.scope;
  const scoped = scopeParam === 'me' ? mockForumPosts.filter((p) => p.user_id === mockUser.id) : mockForumPosts;
  return { data: scoped, error: null };
};

export const fetchForumPost = async (postId) => {
  await wait();
  const post = mockForumPosts.find((p) => String(p.id) === String(postId));
  if (!post) return { data: null, error: new Error('Post not found') };
  return { data: { ...post, comments: mockForumComments[post.id] || [] }, error: null };
};

export const fetchForumComments = async (postId) => {
  await wait();
  return { data: mockForumComments[postId] || [], error: null };
};

export const createComment = async (postId, payload) => {
  await wait();
  const comment = {
    id: `c-${Date.now()}`,
    user_id: currentUser.id,
    body: payload?.body || '',
    created_at: new Date().toISOString(),
  };
  if (!mockForumComments[postId]) {
    mockForumComments[postId] = [];
  }
  mockForumComments[postId].push(comment);
  return { data: comment, error: null };
};

export const votePost = async ({ target_id, value }) => {
  await wait();
  const post = mockForumPosts.find((p) => String(p.id) === String(target_id));
  if (!post) return { data: null, error: new Error('Post not found') };

  if (post.current_user_vote === value) {
    return { data: { new_score: post.score, current_user_vote: post.current_user_vote }, error: null };
  }

  if (post.current_user_vote === 1) {
    post.score = Math.max(0, post.score - 1);
  }
  if (value === 1) {
    post.score += 1;
  }
  post.current_user_vote = value;

  return { data: { new_score: post.score, current_user_vote: post.current_user_vote }, error: null };
};

export const removeVote = async (_targetType, targetId) => {
  await wait();
  const post = mockForumPosts.find((p) => String(p.id) === String(targetId));
  if (!post) return { data: null, error: new Error('Post not found') };

  if (post.current_user_vote === 1) {
    post.score = Math.max(0, post.score - 1);
  }
  post.current_user_vote = null;

  return { data: { new_score: post.score, current_user_vote: null }, error: null };
};

export const createForumPost = async (payload) => {
  await wait();
  const newPost = {
    id: `post-${Date.now()}`,
    title: payload?.title || 'Yeni baslik',
    body: payload?.body || '',
    category: payload?.category || 'diger',
    image_url: payload?.image_url || randomImage(Math.floor(Math.random() * 1000)),
    created_at: new Date().toISOString(),
    user_id: mockUser.id,
    score: 0,
    current_user_vote: null,
  };
  mockForumPosts.unshift(newPost);
  mockForumComments[newPost.id] = [];
  return { data: newPost, error: null };
};

export const uploadPostImage = async () => {
  await wait();
  return { data: { image_url: randomImage(Date.now()) }, error: null };
};

export const fetchCafeteriaMenus = async (provider = 'kyk') => {
  await wait();
  const data = provider === 'gsb' ? mockMenus.gsb : mockMenus.kyk;
  return { data, error: null };
};
