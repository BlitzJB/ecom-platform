export async function addToCart(productId: string) {
    const form = new FormData()
    form.set('productId', productId)
    const response = await fetch('/api/addCartItem', {
        method: 'POST',
        body: form
    })
    if (response.status == 403) {
        return false
    } else if (response.status == 400) {
        return false
    }
    return true
}