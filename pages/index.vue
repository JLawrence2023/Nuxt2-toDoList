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

<script>
import AppFilter from "../components/organisms/AppFilter.vue";
import AppCard from "../components/organisms/AppCard.vue";
import AppModal from "../components/organisms/AppModal.vue";
// import { column1 } from "../utils/constants";
// import { column2 } from "../utils/constants";
// import { column3 } from "../utils/constants";
// import { column4 } from "../utils/constants";
import { customSort } from "../utils/constants";
export default {
  data() {
    return {
      title: "", // Initialize the title data property
      tags: ["tag1", "tag2", "tag3", "tag4"], // Replace with your actual tags array
      selectedTags: [], // Initialize the selectedTags data property as an array
      allListNumbers: [], // Initialize allListNumbers data property as an array
      allTags: [],
      isFiltering: false,
      items: [
        {
          id: 1,
          title: "Sample Task 1",
          tag: ["tag1", "tag2"],
          list: 1,
        },
        {
          id: 2,
          title: "Sample Task 2.1",
          tag: ["tag1", "tag3"],
          list: 2,
        },
        {
          id: 3,
          title: "Sample Task 2.2",
          tag: ["tag2"],
          list: 2,
        },
        {
          id: 4,
          title: "Sample Task 3",
          tag: ["tag3"],
          list: 3,
        },
        {
          id: 5,
          title: "Sample Task 4.1",
          tag: ["tag4"],
          list: 4,
        },
        {
          id: 6,
          title: "Sample Task 4.2",
          tag: ["tag4"],
          list: 4,
        },
        {
          id: 7,
          title: "Sample Task 4.2",
          tag: ["tag5"],
          list: 4,
        },
        {
          id: 8,
          title: "Sample Task 4.2",
          tag: ["tag6"],
          list: 4,
        },
      ],
    };
  },

  methods: {
    reorderTasks(sourceItemID, targetItemID) {
      const sourceIndex = this.items.findIndex(
        (item) => item.id === Number(sourceItemID)
      );
      const targetIndex = this.items.findIndex(
        (item) => item.id === Number(targetItemID)
      );

      if (sourceIndex !== -1 && targetIndex !== -1) {
        this.items.splice(targetIndex, 0, this.items.splice(sourceIndex, 1)[0]);
      }
    },
    updateAllListNumbers() {
      this.allListNumbers = this.items.map((item) => item.list);
      this.allListNumbers.sort((a, b) => a - b);
    },
    createdTask1(params) {
      // Handle the emitted event from Modal.vue and add the task to items
      this.items.push({
        id: this.items.length + 1,
        title: params.taskTitle,
        tag: params.selectedTags, // Store selected tags as an array
        list: 1, // Replace with the appropriate list ID
      });
      this.getAllTags();
      this.updateAllListNumbers();
    },
    createdTask2(params) {
      // Handle the emitted event from Modal.vue and add the task to items
      this.items.push({
        id: this.items.length + 1,
        title: params.taskTitle,
        tag: params.selectedTags, // Store selected tags as an array
        list: 2, // Replace with the appropriate list ID
      });
      this.getAllTags();
      this.updateAllListNumbers();
    },
    createdTask3(params) {
      // Handle the emitted event from Modal.vue and add the task to items
      this.items.push({
        id: this.items.length + 1,
        title: params.taskTitle,
        tag: params.selectedTags, // Store selected tags as an array
        list: 3, // Replace with the appropriate list ID
      });
      this.getAllTags();
      this.updateAllListNumbers();
    },
    createdTask4(params) {
      // Handle the emitted event from Modal.vue and add the task to items
      this.items.push({
        id: this.items.length + 1,
        title: params.taskTitle,
        tag: params.selectedTags, // Store selected tags as an array
        list: 4, // Replace with the appropriate list ID
      });
      this.getAllTags();
      this.updateAllListNumbers();
    },

    getList(list) {
      // Filter the items based on the selected tags and list number
      return this.items.filter(
        (item) =>
          item.list === list &&
          (this.selectedTags.length === 0 ||
            this.selectedTags.every((tag) => item.tag.includes(tag)))
      );
    },

    startDrag(event, item) {
      console.log(item);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemID", item.id);
    },
    onDrop(event, list) {
      const itemID = event.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id === Number(itemID));
      item.list = list;
    },
    dragOver(event, item) {
      if (this.isFiltering) {
        event.preventDefault(item); // Prevent dropping while filtering
      }
    },

    submitModal() {
      // Push the new task into the items array
      this.items.push({
        id: this.items.length + 1,
        title: this.title,
        tag: this.selectedTags, // Store the selected tags
        list: 1, // Replace with the appropriate list ID
      });

      // Reset the input and selected tags after submission
      this.title = "";
      this.selectedTags = [];
    },
    getBadgeNumber(list) {
      const itemsList = this.getList(list);
      return itemsList.length;
    },
    onTagSelected(selectedTags) {
      // Handle the selected tags here

      this.isFiltering = selectedTags.length > 0;
      this.selectedTags = selectedTags;
    },
    // onTagSelected(tag) {
    //   // Do something with the selected tag
    //   console.log(`Selected Tag: ${tag}`);
    // },
    getAllTags() {
      const uniqueTags = {};

      for (const item of this.items) {
        for (const tag of item.tag) {
          uniqueTags[tag] = true;
        }
      }

      this.allTags = customSort(Object.keys(uniqueTags));
    },

    // ... your other methods
  },
  created() {
    // Call the method to log the sorted tags and list numbers when the component is created
    this.getAllTags();
    // console.log("All Items:", this.items);
  },

  components: {
    AppFilter,
    AppCard,
    AppModal,
  },
};
</script>

<style scoped></style>
