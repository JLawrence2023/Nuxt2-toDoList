<template>
  <div class="filter-container">
    <div class="tag-desc">タグ</div>
    <div class="dropdown">
      <div class="selected-item" @click="toggleDropdown">
        <span
          class="arrow"
          :class="{ 'arrow-up': dropdownOpen, 'arrow-down': !dropdownOpen }"
          >&#x25BE;</span
        >
      </div>
      <ul v-show="dropdownOpen" class="dropdown-list">
        <div>
          <input
            class="search-input"
            id="search-input"
            type="text"
            v-model="searchText"
            placeholder="タグを検索..."
          />
          <div>
            <button class="unsellect-all-tag" @click="unselectAllTags">
              未選択
            </button>
          </div>
          <div class="choose-tag">
            <label v-for="tag in filteredTags" :key="tag">
              <input
                type="checkbox"
                :value="tag"
                v-model="selectedTags"
                @change="handleTagSelection"
              />
              {{ tag }}
              <span v-if="selectedTags.includes(tag)">✔️</span>
            </label>
          </div>

          <div>
            <button type="submit" class="narrow-down" @click="handleNarrowDown">
              絞り込む
            </button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allTags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dropdownOpen: false,
      selectedItem: null,
      selectedTags: [],
      searchText: "",
      isFiltering: false,
    };
  },

  computed: {
    filteredTags() {
      // Use computed property to filter the tags based on the search input
      return this.allTags.filter((tag) =>
        tag.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    handleTagSelection() {
      // Close the dropdown after a tag is selected or unselected
      this.dropdownOpen = true;

      // Update the selectedItem to display selected tags in the dropdown
      if (this.selectedTags.length > 0) {
        this.selectedItem = this.selectedTags.join(", ");
      } else {
        this.selectedItem = null;
      }
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    handleNarrowDown() {
      // Log the selected tags in the console
      this.$emit("tag-selected", this.selectedTags);
      this.isFiltering = true;
    },
    selectTag(tag) {
      if (this.selectedTags.includes(tag)) {
        // If the tag is already selected, remove it from the selectedTags array
        this.selectedTags = this.selectedTags.filter(
          (selectedTag) => selectedTag !== tag
        );
      } else {
        // If the tag is not selected, add it to the selectedTags array
        this.selectedTags.push(tag);
      }

      // Update the selectedItem to display selected tags in the dropdown
      if (this.selectedTags.length > 0) {
        this.selectedItem = this.selectedTags.join(", ");
      } else {
        this.selectedItem = null;
      }
      this.isFiltering = true;
    },
    unselectAllTags() {
      // Clear the selectedTags array to unselect all tags
      this.selectedTags = [];
      this.selectedItem = null;
      this.isFiltering = false;
    },
  },
};
</script>

<style>
.choose-tag label {
  margin-top: 5px;
  margin-bottom: 5px;
}
.choose-tag input[type="checkbox"] {
  position: absolute;
  left: -9999px;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.selected-item {
  width: 150px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #bcbcbc;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.arrow {
  margin-right: 5px;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: 90%;
  left: 0;
  list-style: none;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px 4px 0 0;
  background-color: #fff;
  width: 150px;
  height: 207px;
  z-index: 5;
  overflow: hidden;
  padding-left: 0;
}

.dropdown-list li {
  padding: 8px;
  cursor: pointer;
}

.dropdown-list li:hover {
  background-color: #f0f0f0;
}

.tag-dropdown {
  width: 150px;
  height: 30px;
  border: 1px solid #ffffff;
}
.search-input {
  border-radius: 3px;
  border: 1px solid #bcbcbc;
  background: #fff;
  padding: 2px 0 2px 10px;
  width: 140px;
  height: 30px;
  color: #000000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin: 4px;
  margin-bottom: 20px;
}
.choose-tag {
  height: 105px;
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 7px;
  overflow-y: auto;
}
.narrow-down {
  display: flex;
  text-align: center;
  margin: 0;
  background-color: black;
  color: white;
  width: 100%;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border: none;
}
.unsellect-all-tag {
  margin-left: 7px;
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  border: none;
  background-color: transparent;
}
.tag-desc {
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
}
.filter-container {
  margin-bottom: 39px;
}
</style>
