class HTTP {
  constructor(url) {
    this.url = url;
  }

  async get() {
    try {
      const api = await fetch(this.url);
      if (!api.ok) {
        throw new Error(`API status: ${api.status}`);
      }
      const response = await api.json();
      return response;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async post(data) {
    try {
      const api = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!api.ok) {
        throw new Error(`API status: ${api.status}`);
      }
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async delete() {}
}
