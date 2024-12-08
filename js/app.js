var app = angular.module('tiendaApp', []);

app.controller('TiendaController', ['$scope', '$http', function($scope, $http) {
    $scope.imagenesSlider = [
        'media/image/Carrousel/0.jpg',
        'media/image/Carrousel/1.png',
        'media/image/Carrousel/2.png',
        'media/image/Carrousel/3.png'
    ];

    $scope.title = 'Libros Magicos';
    $scope.productos = [];
    $scope.carrito = [];
    $scope.totalCarrito = 0;

    $scope.cargarProductos = function() {
        $http.get('https://fakestoreapi.com/products')
            .then(function(response) {
                $scope.productos = response.data;
                $scope.categorias = [...new Set($scope.productos.map(producto => producto.category))];
                
            });
    };

    $scope.verDetalles = function(producto) {
        $scope.productoSeleccionado = producto;
        $('#detalleProductoIndividual').modal('show');
    };

    $scope.agregarAlCarrito = function(producto) {
        let item = $scope.carrito.find(p => p.id === producto.id);
        if (item) {
            item.cantidad++;
            item.subtotal = item.subtotal + item.price;
        } else {
            $scope.carrito.push({ ...producto, cantidad: 1, subtotal:producto.price  });
        }
        $scope.calcularTotal();
        $scope.cerrarModal();
    };

    $scope.verCarrito = function() {
        $('#carritoCompra').modal('show');
    };

    $scope.cerrarModal = function() {
        $('#detalleProductoIndividual').modal('hide');
    };

    $scope.cerrarCarrito = function() {
        $('#carritoCompra').modal('hide');
    };

    $scope.calcularTotal = function() {
        $scope.totalCarrito = $scope.carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);
    };

    $scope.pagar = function() {

        if($scope.totalCarrito > 0){
            Swal.fire({
                title: 'Compra',
                text: 'Compra realizada con exito.',
                icon: 'success', 
                confirmButtonText: 'Aceptar'
            });
            $scope.carrito = [];
            $scope.totalCarrito = 0;
            $scope.cerrarCarrito();
        }else{
            Swal.fire({
                title: 'Compra',
                text: 'Compra no puede ser realizada.',
                icon: 'warning', 
                confirmButtonText: 'Aceptar'
              });
        }
    };

    $scope.cargarProductos();
}]);
