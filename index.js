const app = angular.module("myApp", []);
app.controller("myController", function ($scope, $http) {
  $scope.listSinhVien = [];
  $scope.form_sinhVien = {
    ten: "",
    chuyenNganh: "udpm",
    tuoi: 0,
    gioiTinh: true,
  };
  $scope.viTriUpdate = -1;
  // viTriUpdate = -1 => Chua chon dong de update

  // GET => Hien thi data len table
  let url = "http://localhost:3000/sinhVien";
  $http.get(url).then(function (response) {
    $scope.listSinhVien = response.data;
    console.log($scope.listSinhVien);
  });

  // Remove => Xoa data khoi table
  $scope.removeStudent = function (event, index) {
    event.preventDefault();
    let sv = $scope.listSinhVien[index];
    let api = url + "/" + sv.id;
    $http.delete(api).then(function () {
      $scope.listSinhVien.splice(index, 1);
    });
  };

  // Detail Student
  $scope.detailStudent = function (event, index) {
    event.preventDefault();
    let sv = $scope.listSinhVien[index];
    $scope.form_sinhVien.ten = sv.ten;
    $scope.form_sinhVien.tuoi = sv.tuoi;
    $scope.form_sinhVien.chuyenNganh = sv.chuyenNganh;
    $scope.form_sinhVien.gioiTinh = sv.gioiTinh;
    $scope.viTriUpdate = index;
  };

  // POST => Them moi du lieu
  $scope.addStudent = function (event) {
    event.preventDefault();
    $http.post(url, $scope.form_sinhVien).then(function () {
      $scope.listSinhVien.push($scope.form_sinhVien);
    });
  };

  // PUT => Update du lieu
  $scope.updateStudent = function (event) {
    event.preventDefault();
    if ($scope.viTriUpdate == -1) {
      alert("Vui long chon dong muon update");
    }
    let sv = $scope.listSinhVien[$scope.viTriUpdate];
    let api = url + "/" + sv.id;
    $http.put(api, $scope.form_sinhVien).then(function (response) {
      $scope.listSinhVien[$scope.viTriUpdate] = response.data;
    });
  };
});
