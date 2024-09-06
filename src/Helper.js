export function comVal(val, obj, type = false) {
    console.log("VL", val)
    // Convert the input object into an array of key-value pairs
    const data = Object.entries(val);

    // Filter the array to include only entries where the value is an array
    if (!type) {
      const updatedData = data
        .filter(([key, value]) => Array.isArray(value))
        .map(([key, value]) => ({ [key]: value }));
      console.log("Com", updatedData)
      const updatedData12 = updatedData.map(item => {
        const [oldKey, value] = Object.entries(item)[0]; // Get the old key and value
        const newKey = obj[oldKey] || oldKey; // Get the new key or default to the old key if not found in mapping
        return { [newKey]: value }; // Create new object with the updated key
      });
      console.log(updatedData12)
      return updatedData12
    }
    else {
      const updatedData = data.map(([key, value]) => ({ [key]: value }));
      const updatedData12 = updatedData.map(item => {
        const [oldKey, value] = Object.entries(item)[0]; // Get the old key and value
        const newKey = obj[oldKey] || oldKey; // Get the new key or default to the old key if not found in mapping
        return { [newKey]: value }; // Create new object with the updated key
      });
      console.log("UP", updatedData12)
      return updatedData12
    }

  }

  export const removeEmptyStringValues = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === '') {
        delete obj[key];
      }
    });
    return obj;
  };

  export const replaceKeys = (obj, keyMap) => {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = keyMap[key] || key; // Use the new key if it exists in the map, otherwise keep the old key
      acc[newKey] = obj[key];
      return acc;
    }, {});
  };

  export   const calAge = (dateVal) => {
    const birthDate = new Date(dateVal);

    // Get the current date
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust if the birth date hasn't occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age

  }