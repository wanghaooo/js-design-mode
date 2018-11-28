//车辆
class Car {
  constructor(num) {
    this.num = num;
  }
}

//摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    };
  }
}

// 出口显示屏
class Screen {
  show(car, inTime) {
    console.log("车牌号", car.num);
    console.log("停车时间", Date.now() - inTime);
  }
}

//停车场
class Park {
  constructor(floors) {
    this.floors = floors || [];
    this.Camera = new Camera();
    this.screen = new Screen();
    this.carList = {};
  }
  in(car) {
    const info = this.Camera.shot(car);
    const place = (() => {
      for (let i = 0; i < this.floors.length; i++) {
        for (let j = 0; j < this.floors[i].places.length; j++) {
          if (this.floors[i].places[j].empty) {
            return this.floors[i].places[j];
          }
        }
      }
    })();
    place.in();
    info.place = place;
    this.carList[car.num] = info;
  }
  out(car) {
    const info = this.carList[car.num];
    const place = info.place;
    place.out();
    this.screen.show(car, info.inTime);
    delete this.carList[car.num];
  }
  emtpyNum() {
    return this.floors
      .map(floor => {
        return `第${floor.index}层还有${floor.emptyPlaceNum()}空闲车位`;
      })
      .join("\n");
  }
}

//层
class Floor {
  constructor(index, places) {
    this.index = index;
    this.places = places || [];
  }
  emptyPlaceNum() {
    let num = 0;
    this.places.forEach(p => {
      if (p.empty) {
        num = num + 1;
      }
    });
    return num;
  }
}

//车位
class Place {
  constructor() {
    this.empty = true;
  }
  in() {
    this.empty = false;
  }
  out() {
    this.empty = true;
  }
}

const floors = [];
for (let i = 0; i < 3; i++) {
  const places = [];
  for (let j = 0; j < 100; j++) {
    places[j] = new Place();
  }
  floors[i] = new Floor(i + 1, places);
}

const park = new Park(floors);

// const car1 = new Car(100);
// const car2 = new Car(200);
// const car3 = new Car(300);

// console.log("第一辆车准备进入");
// console.log(park.emtpyNum());
// park.in(car1);
// console.log("第二辆车准备进入");
// console.log(park.emtpyNum());
// park.in(car2);
// console.log("第一辆车离开");
// park.out(car1);
// console.log("第二辆车离开");
// park.out(car2);

// console.log("第三辆车准备进入");
// console.log(park.emtpyNum());
// park.in(car3);
// console.log("第三辆车离开");
// park.out(car3);
const carlist = [];
for (let i = 1; i < 100; i++) {
  carlist.push(new Car(i * 100));
}
carlist.forEach((car, index) => {
  console.log(`第${index + 1}辆车准备进入`);
  console.log(park.emtpyNum());
  park.in(car);
});
