<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Registro</h2>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input v-model="username" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button class="btn btn-primary" type="submit">Crear cuenta</button>
          <router-link to="/login" class="btn btn-link">Ya tengo cuenta</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RegisterView',
  data() {
    return { username: '', email: '', password: '', error: '', success: '' }
  },
  methods: {
    async register() {
      this.error = ''; this.success = '';
      try {
        const res = await axios.post('/register', { username: this.username, email: this.email, password: this.password });
        if (res.data?.success) {
          this.success = 'Usuario creado correctamente. Redirigiendo a login...';
          setTimeout(() => this.$router.push('/login'), 1000);
        } else {
          this.error = res.data?.message || 'Error';
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Error de conexión';
      }
    }
  }
}
</script>
