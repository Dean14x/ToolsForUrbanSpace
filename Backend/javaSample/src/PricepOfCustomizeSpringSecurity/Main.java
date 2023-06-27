package PricepOfCustomizeSpringSecurity;

import PricepOfCustomizeSpringSecurity.A;

public class Main {
    public static void main(String[] args) {
        A a=new A();
        a.testA(new TestInterface<B>() {
            @Override
            public void custumize(B b) {
                b.print();
            }
        });
    }
}