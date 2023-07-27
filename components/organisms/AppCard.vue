<template>
  <div
    class="new-task-container"
    :draggable="isDraggable"
    @dragstart="startDrag($event, item)"
    @dragover.prevent
    @drop="drop($event, item)"
  >
    <div class="task-title-container">
      <div class="task-title">{{ item.title }}</div>
    </div>
    <div class="new-tag-selected">
      <div class="new-tag-name" v-for="tagItem in item.tag" :key="tagItem">
        {{ tagItem }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isFiltering: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isDraggable() {
      return !this.isFiltering;
    },
  },
  methods: {
    startDrag(event, item) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", "");
      event.dataTransfer.setData("itemID", item.id);
    },
    drop(event, item) {
      event.preventDefault();
      const sourceItemID = event.dataTransfer.getData("itemID");
      if (sourceItemID !== item.id) {
        this.$emit("reorder-tasks", sourceItemID, item.id);
      }
    },
  },
};
</script>

<style>
.new-task-container {
  width: 230px;
  height: 70px;
  border: 1px solid #c1c1c1;
  padding: 5px 9px 0 9px;
  border-radius: 2px;
  margin-bottom: 6px;
}
.task-title-container {
  width: 210px;
  height: 35px;
  margin: auto;
  margin-bottom: 7px;
}
.task-title {
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.new-tag-selected {
  display: flex;
}

.new-tag-name {
  text-align: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 35px;
  height: 15px;
  background: rgb(161, 175, 47);
  border-radius: 10px;
  margin-right: 4px;
}
</style>
