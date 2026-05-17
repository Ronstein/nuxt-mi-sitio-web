export default defineEventHandler(async (event) => {
    // console.log(`New request: ${getRequestURL(event)}`);
    if (!event.path.startsWith('/api/admin')) return;

    //Todo: revisar sesion de usuario
    // const session = await getUserSession(event); //opcional
    const session = await requireUserSession(event); //obligatorio
    const hasAdminRole = session.user.roles.includes('admin');

    if (!hasAdminRole) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }

    return;

});