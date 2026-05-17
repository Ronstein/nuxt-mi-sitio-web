export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CL", {
        style: "currency",
        currency: "CLP",
    }).format(value);
}