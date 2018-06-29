let PRICE = 9.99;

new Vue ({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    newSearch: 'Pugs',
    lastSearch: '',
    loading: false,
    price: PRICE
  },
  methods: {
    onSubmit: function(){
      this.items = [];
      this.loading = true;
      this.$http
        .get(`/search/${this.newSearch}`)
        .then(function(response){
          this.lastSearch = this.newSearch;
          this.items = response.data;
          this.loading = false;
        });
    },
    addItem: function(index) {
      this.total += PRICE;
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
          price: PRICE,
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
  },
  mounted: function() {
    this.onSubmit();
    this.newSearch = '';
  },
});