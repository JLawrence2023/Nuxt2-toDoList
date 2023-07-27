<template>
  <div class="root">
    <button class="buttonAddIssue" @click="isOpen = true">
      <div class="assignment-text">
        <div class="plus">➕</div>
        <div class="add-issue">課題の追加...</div>
      </div>
    </button>
    <div class="modal" v-if="isOpen" @click="handleModalClick">
      <div class="modal-container">
        <div class="text-title-modal">タスクの追加</div>
        <input
          class="input-new-task"
          type="text"
          placeholder="タスクを入力..."
          v-model="title"
        />
        <div class="tag-container">
          <div class="select-tag" @click="toggleDropdown">
            <div class="tag-title">タグ</div>
            <div class="badge-number">{{ dropdownOpen ? "➖" : "➕" }}</div>
          </div>
          <div class="select-tag-dropdown" v-show="dropdownOpen">
            <div class="selected-tag">
              <div
                class="tag"
                v-for="tag in tags"
                :key="tag"
                v-show="selectedTags.includes(tag)"
              >
                <div class="tag-name">{{ tag }}</div>
              </div>
            </div>

            <div class="">
              <div class="tag-dropdown-option">
                <div class="taglist">
                  <div class="taglist-title">タグ一覧</div>
                </div>
                <span
                  class="taglist-list-option"
                  v-for="tag in tags"
                  :key="tag"
                  @click="toggleTag(tag)"
                >
                  {{ tag }} <span v-if="selectedTags.includes(tag)">✔︎</span>
                </span>
              </div>
              <div class="create-tag">
                <input
                  class="input-tag"
                  type="text"
                  placeholder="新しいタグを入力..."
                  v-model="newTag"
                  @keydown.enter="addNewTag"
                />
                <!-- <div class="enter-new-tag">
                  <ButtonAddTag
                    @click="addNewTag"
                    :disabled="isTagAlreadyInList"
                  />
                </div> -->
                <button
                  class="enter-new-tag"
                  @click="addNewTag"
                  :disabled="isTagAlreadyInList"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="close-button" @click="closeModal">キャンセル</button>
          <button
            class="submit-button"
            type="submit"
            @click="submitModal"
            :disabled="isInputEmptyAndNoTagsSelected"
          >
            追加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "Nuxt-property-decorator";
import ButtonAddTag from "../atoms/ButtonAddTag.vue";

@Component({
  components: {
    ButtonAddTag,
  },
})
export default class AppModal extends Vue {
  title = "";
  selectedTags: string[] = [];
  isOpen = false;
  dropdownOpen = false;
  tags: string[] = ["tag1", "tag2", "tag3"];
  newTag = "";

  get isInputEmptyAndNoTagsSelected(): boolean {
    return this.title.trim() === "" || this.selectedTags.length === 0;
  }

  get isTagAlreadyInList(): boolean {
    return this.tags.includes(this.newTag);
  }

  submitModal(): void {
    if (this.isInputEmptyAndNoTagsSelected) return;

    this.$emit("created-task", {
      taskTitle: this.title,
      selectedTags: this.selectedTags,
    });
    this.title = "";
    this.selectedTags = [];
    this.closeModal();
  }

  handleModalClick(event: MouseEvent): void {
    if ((event.target as Element).classList.contains("modal")) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.isOpen = false;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  addNewTag(): void {
    if (this.newTag.trim() !== "" && !this.isTagAlreadyInList) {
      this.tags.push(this.newTag);
      this.newTag = "";
    }
  }

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
  }

  onEscKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.closeModal();
    }
  }

  mounted(): void {
    window.addEventListener("keydown", this.onEscKeyDown);
  }

  beforeUnmount(): void {
    window.removeEventListener("keydown", this.onEscKeyDown);
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";

.buttonAddIssue {
  border: none;
  background-color: transparent;
}
.root {
  position: relative;
}
.modal {
  @include modal-center-position;
}
.modal > div {
  background-color: #fff;
  padding: 10px 50px 50px 50px;
  min-width: 450px;
}

.text-title-modal {
  color: #000000;
  text-align: center;
  font: 400 20px "Inter", sans-serif;
  position: relative;
  width: 230px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin: auto;
}
.input-new-task {
  display: flex;
  border: 1px solid #c1c1c1;
  padding: 10px;
  width: 100%;
  border-radius: 2px;
  margin-top: 10px;
}
.select-tag,
.buttons {
  display: flex;
  margin-top: 10px;
}
.buttons {
  margin-top: 20px;
}

.tag-title {
  height: 25px;
  color: black;
  font-size: 14px;
  font-family: Inter;
  font-weight: 400;
  word-wrap: break-word;
  margin: 0 10px 0 0;
}
.close-button {
  background-color: #eaeaea;
  border: 1px solid #c1c1c1;
  height: 25px;
  padding: 0 7px;
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 10px;
}
.submit-button {
  background-color: #393939;
  height: 25px;
  padding: 0 10px;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
}
.tag {
  width: 35px;
  height: 15px;
  background: rgb(161, 175, 47);
  border-radius: 10px;
  display: inline-block;
  margin-right: 4px;
}

.tag-name {
  text-align: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 35px;
  height: 15px;
}
.tag-dropdown-option {
  width: 170px;
  height: 220px;
  border: 1px solid #c1c1c1;
  overflow-y: auto;
}
.taglist {
  width: auto;
  height: 26px;
  color: white;
  background-color: #393939;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.taglist-title {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  /* line-height: normal; */
}
.taglist-list-option {
  margin-left: 10px;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}
.create-tag {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.input-tag {
  border: 1px solid #c1c1c1;
  width: 115px;
  height: 25px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  padding-left: 10px;
}
// .enter-new-tag {
//   background-color: #393939;
//   color: white;
//   width: 45px;
//   height: 25px;
//   display: flex;
//   text-align: center;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
//   justify-content: center;
// }
.select-tag-dropdown {
  max-width: 170px;
}
</style>
