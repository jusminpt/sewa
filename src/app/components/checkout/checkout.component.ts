import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Country } from '../../common-classes/country';
import { State } from '../../common-classes/state';
import { CheckoutValidators } from '../../validators/checkout-validators';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common-classes/order';
import { OrderItem } from '../../common-classes/order-item';
import { Purchase } from '../../common-classes/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkout_form_group: FormGroup;
  cart_total_price: number = 0;
  cart_total_quantity: number = 0;
  credit_card_months: number[] = [];
  credit_card_years: number[] = [];
  countries: Country[] = [];
  states: State[] = [];
  shipping_address_states: State[] = [];
  billing_address_states: State[] = [];

  constructor(private formBuilder: FormBuilder, private formService: FormService, private cartService: CartService, private checkoutService: CheckoutService, private router: Router) {

  }

  ngOnInit(): void {
    this.checkout_form_group = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace]),
        email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), CheckoutValidators.isOnlyWhiteSpace])
      }),
      shipping_address: this.formBuilder.group({
        street: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace]),
        city: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace]),
        state: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace])
      }),
      billing_address: this.formBuilder.group({
        street: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace]),
        city: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace]),
        state: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace])
      }),
      credit_card_info: this.formBuilder.group({
        cardType: new FormControl("", [Validators.required]),
        nameOnCard: new FormControl("", [Validators.required, Validators.minLength(2), CheckoutValidators.isOnlyWhiteSpace]),
        cardNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9]{16}")]),
        cardSecurityNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9]{3}")]),
        cardExpireMonth: [""],
        cardExpireYear: [""]
      }),
    });

    //add credit card months and years
    const startMonth: number = new Date().getMonth() + 1;
    console.log(`Start month: ${startMonth}`);
    this.formService.getCardMonths(startMonth).subscribe(
      data => {
        console.log(`Retrieved credit card months: ` + JSON.stringify(data));
        this.credit_card_months = data;
      }
    )

    this.formService.getCardYears().subscribe(
      data => {
        console.log(`Retrieved credit card years: ` + JSON.stringify(data));
        this.credit_card_years = data;
      }
    )

    //add countries and states
    this.formService.getCountries().subscribe(
      data => {
        console.log(`Retrieved country: ` + JSON.stringify(data));
        this.countries = data;
      }
    )

    this.reviewCartDetails();
  }

  reviewCartDetails() {
    //subcribe to cartService
    this.cartService.cart_total_price.subscribe(
      data => this.cart_total_price = data
    )

    this.cartService.cart_total_quantity.subscribe(
      data => this.cart_total_quantity = data
    )
  }

  getStates(form_group_name: string) {
    const form_group = this.checkout_form_group.get(form_group_name);


    const country_code = form_group.value.country.code;
    const country_name = form_group.value.country.country_name;

    console.log(`${form_group_name} code: ${country_code}`);
    console.log(`${form_group_name} name: ${country_name}`);

    this.formService.getStates(country_code).subscribe(
      data => {
        if (form_group_name === "shipping_address") {
          this.shipping_address_states = data;
        } else {
          this.billing_address_states = data;
        }

        //set default state
        form_group.get('state').setValue(data[0]);
      }
    );
  }

  get firstName() {
    return this.checkout_form_group.get("customer.firstName");
  }
  get lastName() {
    return this.checkout_form_group.get("customer.lastName");
  }
  get email() {
    return this.checkout_form_group.get("customer.email");
  }

  get shipping_address_street() {
    return this.checkout_form_group.get("shipping_address.street");
  }
  get shipping_address_city() {
    return this.checkout_form_group.get("shipping_address.city");
  }
  get shipping_address_state() {
    return this.checkout_form_group.get("shipping_address.state");
  }
  get shipping_address_country() {
    return this.checkout_form_group.get("shipping_address.country");
  }
  get shipping_address_zipCode() {
    return this.checkout_form_group.get("shipping_address.zipCode");
  }

  get billing_address_street() {
    return this.checkout_form_group.get("billing_address.street");
  }
  get billing_address_city() {
    return this.checkout_form_group.get("billing_address.city");
  }
  get billing_address_state() {
    return this.checkout_form_group.get("billing_address.state");
  }
  get billing_address_country() {
    return this.checkout_form_group.get("billing_address.country");
  }
  get billing_address_zipCode() {
    return this.checkout_form_group.get("billing_address.zipCode");
  }

  get credit_card_info_cardType() {
    return this.checkout_form_group.get("credit_card_info.cardType");
  }
  get credit_card_info_nameOnCard() {
    return this.checkout_form_group.get("credit_card_info.nameOnCard");
  }
  get credit_card_info_cardNumber() {
    return this.checkout_form_group.get("credit_card_info.cardNumber");
  }
  get credit_card_info_cardSecurityNumber() {
    return this.checkout_form_group.get("credit_card_info.cardSecurityNumber");
  }
  get credit_card_info_cardExpireMonth() {
    return this.checkout_form_group.get("credit_card_info.cardExpireMonth");
  }
  get credit_card_info_cardExpireYear() {
    return this.checkout_form_group.get("credit_card_info.cardExpireYear");
  }


  copyShippingAddress(event) {
    if (event.target.checked) {
      this.checkout_form_group.controls['billing_address'].setValue(this.checkout_form_group.controls['shipping_address'].value);
      //fix bug
      this.billing_address_states = this.shipping_address_states;
    } else {
      this.checkout_form_group.controls['billing_address'].reset();
      this.billing_address_states = [];
    }
  }

  handleMonth() {
    const credit_card_form_group = this.checkout_form_group.get("credit_card_info");

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(credit_card_form_group.value.cardExpireYear)

    //if current year, return the rest of month in year
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCardMonths(startMonth).subscribe(
      data => {
        this.credit_card_months = data;
      }
    )
  }

  onSubmit() {
    if (this.checkout_form_group.invalid) {
      this.checkout_form_group.markAllAsTouched();
      return;
    }

    // console.log("Handling the submit button.");
    // console.log(this.checkout_form_group.get('customer').value);
    // console.log("The shipping Address is " + this.checkout_form_group.get("shipping_address").value.country.country_name);

    //set up order
    let order = new Order();
    order.total_price = this.cart_total_price;
    order.total_quantity = this.cart_total_quantity

    //get items from cart
    const cartItems = this.cartService.cart_items;

    //create orderItems
    let orderItems: OrderItem[] = [];
    for (let i = 0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }

    //set up and populate purchase
    let purchase = new Purchase();

    // customer
    purchase.customer = this.checkout_form_group.controls["customer"].value;
    console.log(purchase.customer.firstName);
    console.log(purchase.customer.lastName);

    // shipping
    purchase.shipping_address = this.checkout_form_group.controls['shipping_address'].value;
    const shipping_state: State = JSON.parse(JSON.stringify(purchase.shipping_address.state));
    const shipping_country: Country = JSON.parse(JSON.stringify(purchase.shipping_address.country));
    purchase.shipping_address.state = shipping_state.state_name;
    purchase.shipping_address.country = shipping_country.country_name;

    // billing
    purchase.billing_address = this.checkout_form_group.controls['billing_address'].value;
    const billing_state: State = JSON.parse(JSON.stringify(purchase.billing_address.state));
    const billing_country: Country = JSON.parse(JSON.stringify(purchase.billing_address.country));
    purchase.billing_address.state = billing_state.state_name;
    purchase.billing_address.country = billing_country.country_name;

    purchase.order = order;
    purchase.orderItems = orderItems;

    //call REST API
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`We have received your order. \nYour tracking number: ${response.order_tracking_number}`);
        // reset cart
        this.resetCart();
      },
      error: response => {
        alert(`Something went wrong: ${response.message}`);
      }
    }
    );
  }

  resetCart() {
    this.cartService.cart_items = [];
    this.cartService.cart_total_price.next(0);
    this.cartService.cart_total_quantity.next(0);

    this.checkout_form_group.reset();

    this.router.navigateByUrl("/products");
  }

}
