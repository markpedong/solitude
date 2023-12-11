import styles from './styles.module.scss'

const Home = () => {
    return (
        <div className="flex h-screen" id={styles.homeContainer}>
            <div className="m-auto">
                <div className="p-8 shadow-lg rounded-xl text-center bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline text-cyan-600 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    <h1 className="text-3xl font-bold text-cyan-500">Sign In</h1>
                    <h3 className="text-1xl font-semibold text-gray-500">Sign in to your account!</h3>
                    <div className="text-left pt-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-1 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="block p-1 mt-3 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
                        />
                        <a className="text-sm text-cyan-600 underline">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="bg-cyan-200 p-2 pr-5 pl-5 text-gray-800 font-semibold rounded-xl border-cyan-700 focus:ring-2 m-4">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
