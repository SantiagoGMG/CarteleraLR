<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Login</h2>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button class="btn btn-primary" type="submit">Ingresar</button>
          <router-link to="/register" class="btn btn-link">Registrarse</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginView',
  data() { return { email: '', password: '', error: '' } },
  methods: {
    async login() {
      this.error = '';
      try {
        const res = await axios.post('/login', { email: this.email, password: this.password });
        if (res.data?.success) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.$router.push('/home');
        } else {
          this.error = res.data?.message || 'Credenciales inválidas';
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Error de conexión';
      }
    }
  }
}
</script>
