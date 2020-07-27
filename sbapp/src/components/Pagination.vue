<template>
    <div class="ui pagination menu">
      <a v-if="currentPage > 1" @click="changePage(currentPage - 1)" class="item">
        {{ config.previousText }}
      </a>
      <a v-for="(num, index) in array" :key="index" :class="{ 'active': num === currentPage }" class="item" @click.prevent="changePage(num)">
        {{ num }}
      </a>
      <a v-if="currentPage !== lastPage && lastPage !== 0" @click.prevent="changePage(currentPage + 1)" class="item">
        {{ config.nextText }}
      </a>
    </div>
</template>

<script>
export default {
    name: 'pagination',

    props: {
        total: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        callback: {
            type: Function,
            required: true
        },
        options: {
            type: Object
        }
    },

    data() {
        return { currentPage: 1 }
    },

    computed: {
        _total() {
            return this.total
        },
        _pageSize() {
            return this.pageSize
        },
        lastPage() {
            let _total = this._total / this._pageSize;
            if (_total < 1)
                return 1;

            if (_total % 1 != 0)
                return parseInt(_total + 1);

            return _total;
        },
        array() {

            let _from = this.currentPage - this.config.offset;
            if (_from < 1)
                _from = 1;

            let _to = _from + (this.config.offset * 2);
            if (_to >= this.lastPage)
                _to = this.lastPage;

            let _arr = [];
            while (_from <= _to) {
                _arr.push(_from);
                _from++;
            }

            return _arr;
        },
        config() {
            return Object.assign({
                offset: 2,
                previousText: 'Prev',
                nextText: 'Next',
            }, this.options);
        }
    },

    methods: {
        changePage(page) {
            if (this.currentPage === page) return;
            this.currentPage = page;
            this.callback(page);
        }
    },    
}
</script>
