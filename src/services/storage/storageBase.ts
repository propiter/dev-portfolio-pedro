import data from "../../data/data.json";

export class StorageBase {
  private readonly storageKey = "portfolioData";

  protected initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  }

  protected getData() {
    this.initializeStorage();
    return JSON.parse(localStorage.getItem(this.storageKey) || "{}");
  }

  protected saveData(newData: any) {
    const existingData = this.getData(); // Obtén los datos actuales
    const mergedData = { ...existingData, ...newData }; // Combina los datos actuales con los nuevos
    localStorage.setItem(this.storageKey, JSON.stringify(mergedData)); // Guarda la combinación
  }
}
