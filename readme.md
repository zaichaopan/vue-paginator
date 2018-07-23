# Vue Paginator

A flexible pagination plugin built with Vue.

![vue-paginator](https://github.com//zaichaopan/vue-paginator/blob/master/public/demo.png?raw=true "vue paginator")

[Play it on code sandbox](https://jznoq7r2ly.codesandbox.io/)

## Usage

__The main difference__ between this plugin and other pagination plugins is __it does not provide any Html template__.

Instead, it takes advantage of the __render function__ to provide you with all the data and methods you need when building pagination.

### Installation

```bash
npm i --save @zaichaopan/vue-paginator
```

### Use the plugin

```js
import vue from 'vue';

import VuePaginator from '@zaichaopan/vue-paginator';

Vue.use(VuePaginator);
```

Now you can use the component __vue-paginator__ in all your own vue components.

### Required Prop

__meta__:

The meta  prop is __required__ and has to be an object which contains 3 properties:

- __total__: the total number of items that needs pagination
- __current_page__: the current page number
- __last_page__: last page number

### Optional Prop

__pagesPerSection:__

The pagesPerSection is used to configure how many pages you want to display in a section. It is __optional__ and the default value is __10__.

### Slot Scope

This plugin uses __slot-slot__ to exposure 4 properties which can be used to build paginator.

* __showPaginator__: a boolean value which is used to hide the pagaintor when you are fetching the data or when there is no data coming back
* __pages__: an array which is used to display page items during a section

* __switcher__: an object which provides you with functionality to go to next page, previous page or a specific page:
    - __switcher.prev__: method, go to previous page
    - __switcher.next__: method, go to next page
    - __switcher.toPage(page)__: method, go to a specific page

* __section__: an object which allows you to easily go to next or previous section. It also helps you hide section indicator where is no next and previous section.

   - __section.showPrev__: boolean, whether there is a previous section or not
   - __section.showNext__: boolean, whether there is a next section or not
   - __section.next__: method, go to next section
   - __section.prev__: method, go to previous section

 Consider the following example:

```html
<template>
  <vue-paginator :meta="meta">
    <div v-if="showPaginator" slot-scope="{showPaginator, pages, switcher, section}">
        <li class="page-item" @click.prevent="switcher.prev">
            <a class="page-link" href="#" >
                Previous
            </a>
        </li>

        <li class="page-item" v-if="section.showPrev" @click.prevent="section.prev">
            <a class="page-link" href="#">
            ...
            </a>
        </li>

        <li class="page-item" v-for="(page, index) in pages" :key="index">
            <a class="page-link" href="#" @click.prevent="switcher.toPage(page)">
                {{ page }}
            </a>
        </li>

        <li class="page-item" v-if="section.showNext" @click.prevent="section.next">
            <a class="page-link" href="#">
            ...
            </a>
        </li>

        <li class="page-item" @click.prevent="switcher.next">
            <a class="page-link" href="#">
                Next
            </a>
        </li>
    </div>
  </vue-paginator>
</template>
```

### Page switched event

When user navigates to a different page, the event __pagination:switched__ will be emitted. So you can simply listen for this event and fetch the data again.

```html
<vue-paginator :meta="meta"  @pagination:switched="getUsers">
    <div v-if="showPaginator" slot-scope="{showPaginator, pages, switcher, section}">
        <li class="page-item" @click.prevent="switcher.prev">
            <a class="page-link" href="#" >
                Previous
            </a>
        </li>

        <li class="page-item" v-if="section.showPrev" @click.prevent="section.prev">
            <a class="page-link" href="#">
            ...
            </a>
        </li>

        <li class="page-item" v-for="(page, index) in pages" :key="index">
            <a class="page-link" href="#" @click.prevent="switcher.toPage(page)">
                {{ page }}
            </a>
        </li>

        <li class="page-item" v-if="section.showNext" @click.prevent="section.next">
            <a class="page-link" href="#">
            ...
            </a>
        </li>

        <li class="page-item" @click.prevent="switcher.next">
            <a class="page-link" href="#">
                Next
            </a>
        </li>
    </div>
  </vue-paginator>
</template>

<script>
export default {

    methods: {
        getUsers(page) {
            //...
        }
    }
}
</script>
```

A complete example can be found in [code sandbox](https://codesandbox.io/s/jznoq7r2ly)
