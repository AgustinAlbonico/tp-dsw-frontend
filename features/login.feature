Feature: Reservas canchas deportivas

    Scenario: Elegir opcion "Iniciar Sesión"
     Given Que estoy en la página de PitchBookings
     When Hago click en el "Menu hamburguesa"
     And Hago clic en el boton "Iniciar Sesión"
     Then Soy redirigido a la proxima página
     And Deberia ver el label "Login"