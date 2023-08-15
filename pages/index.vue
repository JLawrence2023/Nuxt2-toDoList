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
              <AppModal
                @created-task="createdTask1"
                :tag="tags"
                :all-tags="allTags"
              />
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
              <AppModal
                @created-task="createdTask2"
                :tag="tags"
                :all-tags="allTags"
              />
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
              <AppModal
                @created-task="createdTask3"
                :tag="tags"
                :all-tags="allTags"
              />

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
              <AppModal
                @created-task="createdTask4"
                :tag="tags"
                :all-tags="allTags"
              />

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
import { Component, Vue } from "nuxt-property-decorator";
import AppFilter from "../components/organisms/AppFilter.vue";
import AppCard from "../components/organisms/AppCard.vue";
import AppModal from "../components/organisms/AppModal.vue";
import { customSort } from "../utils/constants";
import { Item } from "../interfaces/itemInterface";
// import { itemsData } from "../data/itemsData";
import axios from "axios";

@Component({
  components: {
    AppFilter,
    AppCard,
    AppModal,
  },
})
export default class Index extends Vue {
  title: string = "";
  tags: string[] = [];
  selectedTags: string[] = [];
  allListNumbers: number[] = [];
  allTags: string[] = [];
  isFiltering = false;
  itemsData: Item[] = [];

  async mounted() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks");
      this.itemsData = response.data.tasks;
      console.log(this.itemsData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }

    this.getAllTags();
  }

  async reorderTasks(
    sourceItemID: string,
    targetItemID: string
  ): Promise<void> {
    const sourceIndex = this.itemsData.findIndex(
      (item) => item.id === Number(sourceItemID)
    );
    const targetIndex = this.itemsData.findIndex(
      (item) => item.id === Number(targetItemID)
    );

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const sourceTask = this.itemsData[sourceIndex];
      const targetTask = this.itemsData[targetIndex];

      // Update the frontend UI first
      this.itemsData.splice(sourceIndex, 1);
      this.itemsData.splice(targetIndex, 0, sourceTask);

      // Update the backend via API
      axios
        .put("http://127.0.0.1:8000/api/tasks/reorder", {
          sourceItemId: sourceTask.id,
          targetItemId: targetTask.id,
        })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          // Handle error if needed
          console.error(error);
          // Revert the frontend UI changes on error
          this.itemsData.splice(targetIndex, 1);
          this.itemsData.splice(sourceIndex, 0, sourceTask);
        });
    }
  }

  startDrag(event: DragEvent, item: Item): void {
    console.log(item);
    event.dataTransfer!.dropEffect = "move";
    event.dataTransfer!.effectAllowed = "move";
    event.dataTransfer!.setData("itemID", item.id.toString());
  }

  async onDrop(event: DragEvent, list: number): Promise<void> {
    const itemID = event.dataTransfer!.getData("itemID");
    const item = this.itemsData.find((item) => item.id === Number(itemID));
    if (item) {
      item.list = list;

      axios
        .put(`http://127.0.0.1:8000/api/task/${item.id}`, {
          tasks: {
            title: item.title,
            tag: item.tag,
            list: list,
            position: item.position,
          },
        })
        .then((response) => {
          // console.log(response.data.message);
          // console.log("Updated itemsData after card drop:", this.itemsData);
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    }
  }

  dragOver(event: DragEvent, item: Item): void {
    if (this.isFiltering) {
      event.preventDefault();
    }
  }

  updateAllListNumbers(): void {
    this.allListNumbers = this.itemsData.map((item) => item.list);
    this.allListNumbers.sort((a, b) => a - b);
  }

  async createdTask1(params: {
    taskTitle: string;
    selectedTags: string[];
  }): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/task/store",
        {
          tasks: {
            title: params.taskTitle,
            tag: params.selectedTags,
            list: 1,
          },
        }
      );
      const newTask = response.data;
      this.itemsData.push(newTask);
      this.getAllTags();
      this.updateAllListNumbers();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }
  async createdTask2(params: {
    taskTitle: string;
    selectedTags: string[];
  }): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/task/store",
        {
          tasks: {
            title: params.taskTitle,
            tag: params.selectedTags,
            list: 2,
          },
        }
      );
      const newTask = response.data;
      this.itemsData.push(newTask);
      this.getAllTags();
      this.updateAllListNumbers();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }
  async createdTask3(params: {
    taskTitle: string;
    selectedTags: string[];
  }): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/task/store",
        {
          tasks: {
            title: params.taskTitle,
            tag: params.selectedTags,
            list: 3,
          },
        }
      );
      const newTask = response.data;
      this.itemsData.push(newTask);
      this.getAllTags();
      this.updateAllListNumbers();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }
  async createdTask4(params: {
    taskTitle: string;
    selectedTags: string[];
  }): Promise<void> {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/task/store",
        {
          tasks: {
            title: params.taskTitle,
            tag: params.selectedTags,
            list: 4,
          },
        }
      );
      const newTask = response.data;
      this.itemsData.push(newTask);
      this.getAllTags();
      this.updateAllListNumbers();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  getList(list: number): Item[] {
    return this.itemsData.filter(
      (item) =>
        item.list === list &&
        (this.selectedTags.length === 0 ||
          this.selectedTags.every((tag) => item.tag.includes(tag)))
    );
  }

  submitModal(): void {
    this.itemsData.push({
      id: this.itemsData.length + 1,
      title: this.title,
      tag: this.selectedTags,
      list: 1,
      position: this.itemsData.length + 1,
    });

    this.title = "";
    this.selectedTags = [];
  }

  getBadgeNumber(list: number): number {
    const itemsDataList = this.getList(list);
    return itemsDataList.length;
  }

  onTagSelected(selectedTags: string[]): void {
    this.isFiltering = selectedTags.length > 0;
    this.selectedTags = selectedTags;
  }

  getAllTags(): void {
    const uniqueTags: { [key: string]: boolean } = {};

    for (const item of this.itemsData) {
      for (const tag of item.tag) {
        uniqueTags[tag] = true;
      }
    }

    this.allTags = customSort(Object.keys(uniqueTags));
    console.log(this.allTags);
  }

  created(): void {
    this.getAllTags();
  }
}
</script>

<style scoped>
.todo {
  margin-right: 40px;
}

.assignment-title {
  display: flex;
  align-items: center;
  margin-bottom: 11px;
}
.text-title {
  height: 25px;
  color: black;
  font-size: 16px;
  margin-left: 7px;
  font-weight: 700;
  word-wrap: break-word;
  margin-right: 8px;
}
.badge-number {
  width: 34px;
  height: 21px;
  text-align: center;
  color: black;
  font-size: 14px;
  font-family: Inter;
  font-weight: 700;
  word-wrap: break-word;
  background-color: #d9d9d9;
  border-radius: 15px;
}

.assignment-text {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.plus {
  display: flex;
  width: 13px;
  height: 12px;
  margin-left: 3px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #808080;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 5px;
}
.add-issue {
  display: flex;
  width: 70px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #02836b;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.rectangle {
  width: 100%;
  height: 574px;
  background: white;
  border-radius: 3px;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 250px;
  white-space: nowrap;
}
.container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}
.content {
  display: inline-block;
}
.task-list {
  display: flex;
  align-items: center;
  width: 100%;
}
.inner-container {
  padding: 41px;
  padding-top: 58px;
}
</style>
../interfaces/itemInterface ../data/itemsDataData
