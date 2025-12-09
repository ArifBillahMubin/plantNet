import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { saveOrUpdateUser } from '../../../utils'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // Handle Email Login
  const onSubmit = async (data) => {
    const { email, password } = data

    try {
      const {user} = await signIn(email, password)

      await saveOrUpdateUser({ name: user?.displayName, email: user?.email, imageURL: user?.photoURL })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Login
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      //save in db user data
      await saveOrUpdateUser({ name: user?.displayName, email: user?.email, imageURL: user?.photoURL })


      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          className='space-y-6'
        >
          <div className='space-y-4'>
            {/* Email */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email.'
                  }
                })}
              />
              {errors.email && (
                <p className='text-red-500 text-sm font-semibold'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor='password' className='block mb-2 text-sm'>
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='*******'
                autoComplete='current-password'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                {...register('password', {
                  required: 'Password is required.',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters.'
                  }
                })}
              />
              {errors.password && (
                <p className='text-red-500 text-sm font-semibold'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-lime-500 w-full rounded-md py-3 text-white'
          >
            {loading ? (
              <TbFidgetSpinner className='animate-spin m-auto' />
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className='space-y-1 mt-2'>
          <button className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'>
            Forgot password?
          </button>
        </div>

        {/* Social Login */}
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px dark:bg-gray-700'></div>
        </div>

        {/* Google Button */}
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        {/* Switch to Sign Up */}
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/signup'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
