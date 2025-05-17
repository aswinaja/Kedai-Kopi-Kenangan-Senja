document.addEventListener('alpine:init', () => {
  Alpine.Data('product', () => ({
    items: [
        { id: 1, name: 'Robusta Brazil', img: 'products-1.jpg', price:20000 },
        { id: 2, name: 'Artisnal coffe', img: 'products-2.jpg',price: 25000},
        { id: 3, name: 'Primo passo', img: 'products-3.jpg',price: 30000 },
        { id: 4, name: 'Toraja', img: 'products-4.jpg', price: 35000 },
        { id: 5, name: 'Arabica Honey', img: 'products-5.jpg', price: 25000 }
    ]
  })))

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add (newItem) {
        // cek apakah ada barang yang sama 
        const cartItem = this.items.find(item => item.id === newItem.id)

        // jika belum ada/ masih kosong 
        if (! cartItem) {
            this.items.push({ ...newItem, quantity: 1, total: newItem.price})
          this.quantity++
          this.total += newItem.price  
        } else {
            // jika barang belum ada, cek apakah barang beda atau sama dengan yang ada di cart
            this.items = this.items.map(item =>) {
                // jika barang berbeda 
                if (item.id !== newItem.id) {
                    return item
                } else {
                    // jika barang sudah ada, tambah quantity dan totalnya
                    item.quantity++
                    item.total = item.price * item.quantity
                    this.quantity++
                    this.total += item.price
                    return item
                }
            }
        }
    },
        })
      remove (id) {
        // ambil item yang mau di remove berdasarkan id nya
        const cartItem = this.items.find(item => item.id === id)
        //jika lebih dari 1
        if (cartItem.quantity > 1) {
        } else if (cartItem.quantity === 1) {
            // jika barangnya sisa 1
            this.items = this.items.filter(item => item.id !== id)
            this.quantity
            this.total -= cartItem.price
        }

        // telusuri 1 1
        this.items = this.items.map(item => {
            // jika bukan barang yang di klik 
            if (item.id !== id) {
                return item
            } else {
                item.quantity--
                item.total = item.price * item.quantity
                this.quantity
                this.total -= item.price
                return item
            }
        })
      }




      // form falidation
      const checkoutButton = document.querySelector('checkout-button')
      checkoutButton.disabled = true

      const form = document.querySelector('#checkoutForm')

      form.addEventListener('keyup', function () {
        for (let i = 0; 1 < form.elements.length; i++) {
            if (form.elements[i].value.length !==0) {
                checkoutButton.classList.remove('disable')
                checkoutButton.classList.add('disabled')
            } else {
                return false
            }
        }

        checkoutButton.disabled = false
        checkoutButton.classList.remove('disable')
      })

      // Kirim data ketika checkout di klik 
      checkoutButton.addEventListener('click', async function (e) {
        e.preventDefault()
        const formData = new formData(form)
        const data= new URLSearchParams(formData)
        const objData = Object.fromEntries(data)
        // const massage = formatMessage(objData);
        // window.open('http:wa.me/6287866980280?text=' +encodeURIComponent(message));

        //minta transaction token menggunakan ajax/fetch
        try {
            const response = await fetch('php/placeOrder.php' , {
                method: 'POST',
                body: data 
            })
            const token = await response.text()
            // console.log(token);
            window.snap.pay(token)
        } catch (err) {
            console.log(err.message)
        }
      })

      // format pesan watsapp
      const formatMessage = obj => {
        return Customer
        Nama:${obj.name}
        Email:${obj.email}
        No HP:${obj.phone}
        Data Pesanan
        ${JSON.parse(obj.items).map(
            item => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
        )}
        TOTAL: ${rupiah(obj.total)}
        Terimah Kasih
    }

    // conversi ke rupiah 
    const rupiah = number => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR' ,
            minimumFractionDigits: 0
        }).format(number)
    }