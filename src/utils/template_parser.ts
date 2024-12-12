  
  export function resolveTemplate(
    template: any,
    data: any
  ): any {
    function resolvePlaceholders(obj: any): any {
      if (typeof obj === "string") {
        const regex = /\{\{\s*([^}]+?)\s*\}\}/;
  
        const match = obj.match(regex);
        if (match) {
          let variabelName = "";
  
          obj.replace(/\{\{([\w.]+)\}\}/g, (_, path) => {
            variabelName = path;
            return path;
          });
  
          if (data[variabelName]) {
            return data[variabelName];
          } else {
            throw new Error(`Missing value for key: ${variabelName}`);
          }
        }
      } else if (Array.isArray(obj)) {
        // Recursively resolve placeholders in arrays
        return obj.map(resolvePlaceholders);
      } else if (typeof obj === "object" && obj !== null) {
        // Recursively resolve placeholders in objects
        const resolvedObj: any = {};
        for (const [key, value] of Object.entries(obj)) {
          resolvedObj[key] = resolvePlaceholders(value);
        }
        return resolvedObj;
      }
      // Return the value as-is for non-string primitives
      return obj;
    }
  
    const result = resolvePlaceholders(template);
    return result;
  }