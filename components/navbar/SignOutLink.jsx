import { persistStore } from 'redux-persist'
import { store } from '@/app/redux/store'
import { toast } from 'sonner'
import { useRedirect } from '@/app/hooks/useRedirect'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { clearUserData } from '@/app/redux/actions/userAction'

const SignOutLink = () => {
  const redirectTo = useRedirect()
  const dispatch = useDispatch()

  const handleLogout = () => {
    toast("You have been logged out")

    
    dispatch(clearUserData())

    
    localStorage.removeItem('token')

    
    const persistor = persistStore(store)
    persistor.purge()

    
    redirectTo('/login')
  }

  return (
    <Button className='w-full text-left' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default SignOutLink
