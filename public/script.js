const PRICE = 9.99;
const LOAD_NUM = 10;

new Vue ({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    results: [],
    newSearch: 'Pugs',
    lastSearch: '',
    loading: false,
    price: PRICE
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  },
  computed: {
    noMoreItems: function() {
      return this.items.length === this.results.length && this.results.length > 0
    }
  },
  mounted: function() {
    this.onSubmit();
    this.newSearch = '';

    const vueInstance = this;
    const elem = document.getElementById('product-list-bottom');
    const watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function() {
      vueInstance.appendItems();
    });
  },
  methods: {
    appendItems: function() {
      if(this.items.length < this.results.length) {
        let append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
        this.items = this.items.concat(append);
      }
    },
    onSubmit: function(){
      if(this.newSearch.length) {
        this.items = [];
        this.loading = true;
        this.$http
          .get(`/search/${this.newSearch}`)
          .then(function(response){
            this.lastSearch = this.newSearch;
            this.results  = response.data;
            this.appendItems();
            this.loading = false;
          });
      }
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
});