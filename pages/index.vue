<template>
  <div class="container">
    <div class="inner-container">
      <div class="content">
        <AppFilter
          :allTags="allTags"
          :isFiltering="isFiltering"
          @tag-selected="onTagSelected"
        />
        <div class="task-list">
          <div class="todo">
            <div class="assignment-title">
              <div class="ellipse pink"></div>
              <div class="text-title">未対応</div>
              <div class="badge-number">{{ getBadgeNumber(1) }}</div>
            </div>
            <div
              class="rectangle"
              @drop="onDrop($event, 1)"
              @dragenter.prevent
              @dragover.prevent
            >
              <AppModal @created-task="createdTask1" :tag="tags" />
              <div v-for="item in getList(1)" :key="item.id">
                <AppCard
                  :item="item"
                  :tag="item.tag"
                  @reorder-tasks="reorderTasks"
                  @dragstart="startDrag($event, item)"
                  @dragover.prevent="dragOver($event, item)"
                  :isFiltering="isFiltering"
                />
              </div>
            </div>
          </div>

          <div class="todo">
            <div class="assignment-title">
              <div class="ellipse blue"></div>
              <div class="text-title">処理中</div>
              <div class="badge-number">{{ getBadgeNumber(2) }}</div>
            </div>
            <div
              class="rectangle"
              @drop="onDrop($event, 2)"
              @dragenter.prevent
              @dragover.prevent
            >
              <AppModal @created-task="createdTask2" :tag="tags" />
              <div v-for="item in getList(2)" :key="item.id">
                <AppCard
                  :item="item"
                  :tag="item.tag"
                  @reorder-tasks="reorderTasks"
                  @dragstart="startDrag($event, item)"
                  :isFiltering="isFiltering"
                />
              </div>
            </div>
          </div>
          <div class="todo">
            <div class="assignment-title">
              <div class="ellipse green"></div>
              <div class="text-title">レビュー中</div>
              <div class="badge-number">{{ getBadgeNumber(3) }}</div>
            </div>

            <div
              class="rectangle"
              @drop="onDrop($event, 3)"
              @dragenter.prevent
              @dragover.prevent
            >
              <AppModal @created-task="createdTask3" :tag="tags" />

              <div v-for="item in getList(3)" :key="item.id">
                <AppCard
                  :item="item"
                  :tag="item.tag"
                  @reorder-tasks="reorderTasks"
                  @dragstart="startDrag($event, item)"
                  :isFiltering="isFiltering"
                />
              </div>
            </div>
          </div>
          <div class="todo">
            <div class="assignment-title">
              <div class="ellipse yellow"></div>
              <div class="text-title">完了</div>
              <div class="badge-number">{{ getBadgeNumber(4) }}</div>
            </div>
            <div
              class="rectangle"
              @drop="onDrop($event, 4)"
              @dragenter.prevent
              @dragover.prevent
            >
              <AppModal @created-task="createdTask4" :tag="tags" />

              <div v-for="item in getList(4)" :key="item.id">
                <AppCard
                  :item="item"
                  :tag="item.tag"
                  @reorder-tasks="reorderTasks"
                  @dragstart="startDrag($event, item)"
                  :isFiltering="isFiltering"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "Nuxt-property-decorator";
import AppFilter from "../components/organisms/AppFilter.vue";
import AppCard from "../components/organisms/AppCard.vue";
import AppModal from "../components/organisms/AppModal.vue";
import { customSort } from "../utils/constants";
import { Item } from "../interfaces/item";
import { items } from "../data/items";

@Component({
  components: {
    AppFilter,
    AppCard,
    AppModal,
  },
})
export default class Index extends Vue {
  title = "";
  tags: string[] = [];
  selectedTags: string[] = [];
  allListNumbers: number[] = [];
  allTags: string[] = [];
  isFiltering = false;
  items: Item[] = items;

  reorderTasks(sourceItemID: string, targetItemID: string): void {
    const sourceIndex = this.items.findIndex(
      (item) => item.id === Number(sourceItemID)
    );
    const targetIndex = this.items.findIndex(
      (item) => item.id === Number(targetItemID)
    );

    if (sourceIndex !== -1 && targetIndex !== -1) {
      this.items.splice(targetIndex, 0, this.items.splice(sourceIndex, 1)[0]);
    }
  }

  updateAllListNumbers(): void {
    this.allListNumbers = this.items.map((item) => item.list);
    this.allListNumbers.sort((a, b) => a - b);
  }

  createdTask1(params: { taskTitle: string; selectedTags: string[] }): void {
    this.items.push({
      id: this.items.length + 1,
      title: params.taskTitle,
      tag: params.selectedTags,
      list: 1,
    });
    this.getAllTags();
    this.updateAllListNumbers();
  }

  createdTask2(params: { taskTitle: string; selectedTags: string[] }): void {
    this.items.push({
      id: this.items.length + 1,
      title: params.taskTitle,
      tag: params.selectedTags,
      list: 2,
    });
    this.getAllTags();
    this.updateAllListNumbers();
  }

  createdTask3(params: { taskTitle: string; selectedTags: string[] }): void {
    this.items.push({
      id: this.items.length + 1,
      title: params.taskTitle,
      tag: params.selectedTags,
      list: 3,
    });
    this.getAllTags();
    this.updateAllListNumbers();
  }

  createdTask4(params: { taskTitle: string; selectedTags: string[] }): void {
    this.items.push({
      id: this.items.length + 1,
      title: params.taskTitle,
      tag: params.selectedTags,
      list: 4,
    });
    this.getAllTags();
    this.updateAllListNumbers();
  }

  getList(list: number): Item[] {
    return this.items.filter(
      (item) =>
        item.list === list &&
        (this.selectedTags.length === 0 ||
          this.selectedTags.every((tag) => item.tag.includes(tag)))
    );
  }

  startDrag(event: DragEvent, item: Item): void {
    console.log(item);
    event.dataTransfer!.dropEffect = "move";
    event.dataTransfer!.effectAllowed = "move";
    event.dataTransfer!.setData("itemID", item.id.toString());
  }

  onDrop(event: DragEvent, list: number): void {
    const itemID = event.dataTransfer!.getData("itemID");
    const item = this.items.find((item) => item.id === Number(itemID));
    if (item) {
      item.list = list;
    }
  }

  dragOver(event: DragEvent, item: Item): void {
    if (this.isFiltering) {
      event.preventDefault();
    }
  }

  submitModal(): void {
    this.items.push({
      id: this.items.length + 1,
      title: this.title,
      tag: this.selectedTags,
      list: 1,
    });

    this.title = "";
    this.selectedTags = [];
  }

  getBadgeNumber(list: number): number {
    const itemsList = this.getList(list);
    return itemsList.length;
  }

  onTagSelected(selectedTags: string[]): void {
    this.isFiltering = selectedTags.length > 0;
    this.selectedTags = selectedTags;
  }

  getAllTags(): void {
    const uniqueTags: { [key: string]: boolean } = {};

    for (const item of this.items) {
      for (const tag of item.tag) {
        uniqueTags[tag] = true;
      }
    }

    this.allTags = customSort(Object.keys(uniqueTags));
  }

  created(): void {
    this.getAllTags();
  }
}
</script>

<style scoped></style>
