new Vue ({
  el: '#app',
  data: {
    total: 0,
    items: [
      { id: 1, title: 'Item 1', price: 9.99 },
      { id: 2, title: 'Item 2', price: 19.99  },
      { id: 3, title: 'Item 3', price: 9.99  },
      { id: 4, title: 'Item 4', price: 49.97  },
    ],
    cart: []
  },
  methods: {
    addItem: function(index) {
      this.total += this.items[index].price;
      let item = this.items[index];
      let found = false;
      for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].id === item.id){
          found = true;
          this.cart[i].qty++;
        }
      }
      if(!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: 1
        });
      }
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  }
});