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
    onSubmit: function(){
      console.log('Submitted search');
      
    },
    addItem: function(index) {
      this.total += this.items[index].price;
      let item = this.items[index];
      let found = false;
      for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].id === item.id){
          found = true;
          this.cart[i].qty++;
          break;
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
    },
    inc: function(item) {
      item.qty++;
      this.total += item.price;
    },
    dec: function(item) {
      item.qty--;
      this.total -= item.price;
      if(item.qty <= 0) {
        for(let i = 0; i < this.cart.length; i++){
          if(this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  }
});