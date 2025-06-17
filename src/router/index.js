import { createRouter, createWebHistory } from 'vue-router'
import Feed from '@/views/Feed.vue'
import PostForm from '../components/PostForm.vue'
import AuthForm from '../components/Auth.vue'
import ProfileSettings from '../views/ProfileSettings.vue'
import { supabase } from '../supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Feed,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth', name: 'auth', component: AuthForm
    },
    {
      path: '/createPost', name: 'post', component: PostForm, meta: { requiresAuth: true }
    }, 
    {
      path: '/viewPost/:id',
      name: 'viewPost',
      component: () => import('../components/ViewPost.vue'),
      meta: { requiresAuth: true }
    },
    { path: '/profile-settings', name: 'profile-settings', component: ProfileSettings, meta: { requiresAuth: true } },
  ]
})

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth) {
    return next()
  }

  const { data } = await supabase.auth.getUser()
  const user = data.user

  if (user) {
    next()
  } else {
    next({ name: 'auth' })
  }
})

export default router