export const useAuthentication = () => {
    const { loggedIn, session, user, clear, fetch } = useUserSession();

    const login = async (email: string, password: string) => {
        try {
            await $fetch('/api/auth/login', {
                method: 'POST',
                body: { email, password },
            });

            await fetch();
            navigateTo('/?message= Login succeful');
            return true;
        } catch (error) {
            console.log(error);
            //throw createError
            return false;
        }

    }

    const register = async (fullName: string, email: string, password: string) => {
        // await $fetch('/api/auth/register'
        return true;
    }

    const logout = async () => {
        await clear();
        navigateTo('/?message= Logout Succesful');
    }

    return {
        loggedIn,
        session,
        user,

        //Getters
        isLoggedIn: loggedIn,
        isAdmin: computed(() => user?.value?.roles.includes('admin')),
        //Methods
        fetch,
        login,
        register,
        logout,
    }
}
