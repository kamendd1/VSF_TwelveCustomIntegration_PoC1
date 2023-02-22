<template>
  <div v-if="!isMobile" class="sf-header__navigation desktop" >
    <SfHeaderNavigationItem v-for="(category, index) in categories"
                            :key="index"
                            class="nav-item"
                            v-e2e="`app-header-url_${category.slug}`"
                            :label="categoryGetters.getName(category)"
                            :link="localePath(`/c/${category.slug}`)" />
  </div>

  <SfModal v-else :visible="isMobileMenuOpen">

    <SfHeaderNavigationItem v-for="(category, index) in categories"
                            :key="index"
                            class="nav-item"
                            v-e2e="`app-header-url_${category.slug}`">
      <template #mobile-navigation-item>
        <SfMenuItem :label="categoryGetters.getName(category)" 
                    class="sf-header-navigation-item__menu-item"
                    :link="localePath(`/c/${category.slug}`)"
                    @click="toggleMobileMenu" />
      </template>
    </SfHeaderNavigationItem>

  </SfModal>
</template>

<script>
  import { SfMenuItem, SfModal } from '@storefront-ui/vue';
  import { useUiHelpers, useUiState } from '~/composables';
  import { onSSR } from '@vue-storefront/core';
  import { useCategory, categoryGetters } from '@vue-storefront/vsftwelvepoc1';

  export default {
    name: 'HeaderNavigation',
    components: {
      SfMenuItem,
      SfModal
    },
    props: {
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    setup(props, context) {
      const th = useUiHelpers();
      const { isMobileMenuOpen, toggleMobileMenu } = useUiState();           
      const { categories, search:categorySearch, loading, error } = useCategory('categories');

      onSSR(async () => {               
        const facetsFromUrl = th.getFacetsFromURL();

        console.info('%cHeaderNavigation.vue.onSSR() is about to call useCategory.search...', 'color:fuchsia', facetsFromUrl);
        await categorySearch(facetsFromUrl);

        if (error?.value?.search)
          context.root.$nuxt.error({ statusCode: 404 });
      });

      return {
        categories,
        categoryGetters,
        isMobileMenuOpen,
        toggleMobileMenu
      };
    }
  };
</script>

<style lang="scss" scoped>
  .sf-header-navigation-item {
    ::v-deep &__item--mobile {
      display: block;
    }
  }

  .sf-modal {
    ::v-deep &__bar {
      display: none;
    }

    ::v-deep &__content {
      padding: var(--modal-content-padding, var(--spacer-base) 0);
    }
  }
</style>
