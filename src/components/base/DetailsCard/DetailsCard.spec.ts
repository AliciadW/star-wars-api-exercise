import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import DetailsCard from '@/components/base/DetailsCard/DetailsCard.vue'

describe('DetailsCard', () => {
  it('renders', () => {
    const wrapper = shallowMount(DetailsCard)

    expect(wrapper.exists()).toBe(true)
  })

  // TODO add tests for:
  // * dateToDisplay
  // * getCharacter
})
