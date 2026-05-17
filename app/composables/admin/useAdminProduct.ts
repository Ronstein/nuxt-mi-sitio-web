export const useAdminProduct = async (id: string) => {
    const { data, error, status, execute, refresh, pending } = await useFetch(
        `/api/admin/product/${id}`,
    );

    const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {
        const isCreating = data.id === 0;
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));

        //Todo: Multipart data = archivos
        // Si hay archivos cargalos
        if (files) {
            files.forEach((file) => {
                formData.append('files', file); // files: [file1,file2,file3]
            });
        }

        if (isCreating) {
            //Todo: crear endpoint
            const { product } = await $fetch('/api/admin/product', {
                method: 'POST',
                body: data,
            });
            return product;
        }

        //Todo: actualizar producto

        try {
            const { product } = await $fetch(`/api/admin/product/${id}`, {
                method: 'PATCH',
                // body: data,
                body: formData,
            })

            return product;
        } catch (error) {
            throw createError({
                status: 400,
                message: error instanceof Error ? error.message : 'Unknown Error',
            });
        }
    }

    return {
        data,
        error,
        status,
        execute,
        pending,

        //Methods
        refresh,
        createOrUpdate,
    }
}
