

- **on_search** : All the following sub conditions must pass as per the api requirement

	- **condition Buyer_finder_fees_value_is_correct**: every element of $.message.catalog.providers[*].payments[*].tags[?(@.descriptor.code == 'BUYER_FINDER_FEES')].list[?(@.descriptor.code == 'BUYER_FINDER_FEES_PERCENTAGE')].value must be in $._EXTERNAL.buyer_app_finder_fees
	
	- **condition Vehicle_category_passed_in_is_metro**: every element of $._EXTERNAL.vehicle_category must be in $.message.catalog.providers[*].fulfillments[*].vehicle.category
	
	- **condition Start_code_matches_the_search_call**: every element of $.message.catalog.providers[0].fulfillments[0].stops[?(@.type == 'START')].location.descriptor.code must be in $._EXTERNAL.start_code
	
		> Note: **Condition Start_code_matches_the_search_call** can be skipped if the following conditions are met:
		>
		> - **condition B**: $._EXTERNAL.start_code must **not** be present in the payload
	
	- **condition End_code_matches_the_search_call**: every element of $.message.catalog.providers[0].fulfillments[0].stops[?(@.type == 'END')].location.descriptor.code must be in $._EXTERNAL.end_code
	
		> Note: **Condition End_code_matches_the_search_call** can be skipped if the following conditions are met:
		>
		> - **condition B**: $._EXTERNAL.end_code must **not** be present in the payload

- **select** : All the following sub conditions must pass as per the api requirement

	- **condition check_id_selected**: every element of $.message.order.items[*].id must be in $._EXTERNAL.item_ids[*]

- **on_select** : All the following sub conditions must pass as per the api requirement

	- **condition Category_id_is_correctly_mapped**: every element of $.message.order.items[*].category_ids[*] must be in $._EXTERNAL.category_ids
	
	- **condition Fulfillments_are_correctly_mapped**: every element of $.message.order.items[*].fulfillment_ids[*] must be in $.message.order.fulfillments[*].id

- **init** : All the following sub conditions must pass as per the api requirement

	- **condition Category_id_is_correctly_mapped**: $.message.order.payments[*].tags[?(@.descriptor.code=='BUYER_FINDER_FEES')].list[?(@.descriptor.code=='BUYER_FINDER_FEES_PERCENTAGE')].value must be equal to $._EXTERNAL.buyer_app_finder_fees
	
	- **condition Items_sent_in_init_and_select_are_the_same**: $.message.order.items[*].id must be equal to $._EXTERNAL.selected_ids

- **on_init** : All the following sub conditions must pass as per the api requirement

	- **condition Fulfillments_are_correctly_mapped**: $.message.order.items[*].fulfillment_ids[*] must be equal to $.message.order.fulfillments[*].id

- **confirm** : All the following sub conditions must pass as per the api requirement

	- **condition Items_sent_in_init_and_confirm_are_the_same**: $.message.order.items[*].id must be equal to $._EXTERNAL.selected_ids

- **on_confirm** : All the following sub conditions must pass as per the api requirement

	- **condition Price_matches_payment_and_quote_breakup**: $.message.order.payments[*].params.amount must be equal to $.message.order.quote.price.value