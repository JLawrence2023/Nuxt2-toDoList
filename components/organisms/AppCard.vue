<template>
  <div
    class="new-task-container"
    :draggable="isDraggable"
    @dragstart="startDrag"
    @dragover.prevent
    @drop="drop"
    :style="{ cursor: isDraggable ? 'grab' : 'default' }"
  >
    <div class="task-title-container">
      <div class="task-title">
        <h5>
          {{ item.title }}
        </h5>
      </div>
    </div>
    <div class="new-tag-selected">
      <div class="new-tag-name" v-for="tagItem in item.tag" :key="tagItem">
        {{ tagItem }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/mixins.scss";
@import "../../assets/styles/variables.scss";

.new-task-container {
  width: 230px;
  height: 70px;
  border: 1px solid $border-color;
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
  color: $black;
  font-family: Inter;
}
.new-tag-selected {
  display: flex;
}

.new-tag-name {
  text-align: center;
  color: white;
  font-size: $font-size-tag;
  font-weight: $font-weight-card-title;
  width: 35px;
  height: 15px;
  background: $yellow;
  border-radius: 10px;
  margin-right: 4px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { TaskModel } from "../../model/TaskModel";
import { TaskInterface } from "../../interfaces/taskInterface";

@Component
export default class AppCard extends Vue {
  @Prop({
    type: Object,
    required: true,
    default: () => new TaskModel(),
  })
  item!: TaskInterface;
  @Prop({ type: Boolean, required: true }) isFiltering!: boolean;

  get isDraggable(): boolean {
    return !this.isFiltering;
  }

  startDrag(event: DragEvent): void {
    event.dataTransfer!.effectAllowed = "move";
    event.dataTransfer!.setData("text/plain", "");
    event.dataTransfer!.setData("itemID", this.item.id.toString());
  }

  drop(event: DragEvent): void {
    event.preventDefault();
    const sourceItemID = event.dataTransfer!.getData("itemID");
    if (sourceItemID !== this.item.id.toString()) {
      this.$emit("reorder-tasks", sourceItemID, this.item.id);
    }
  }
}
</script>
