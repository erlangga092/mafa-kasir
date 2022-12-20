<?php

namespace App\Data;

class Person
{
    public function __construct(
        public string $first_name,
        public string $last_name,
    ) {
    }
}
