import { createRouter, createWebHistory } from 'vue-router'
import Profile from '@/views/Profile.vue'
import PostForm from '../components/PostForm.vue'
import AuthForm from '../components/Auth.vue'
import { supabase } from '../supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth', component: AuthForm
    },
    {
      path: '/createPost', name: 'post', component: PostForm, meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const { data } = await supabase.auth.getUser()
  const user = data.user
  if (to.meta.requiresAuth && !user) {
    next('/auth')
  } else {
    next()
  }
})

export default router