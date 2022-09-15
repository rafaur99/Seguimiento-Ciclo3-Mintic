package co.edu.utp.misiontic.rafaeluribe.demosb2.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("api/calculator")
public class CalculadoraController {
    @GetMapping
    public String operarGet(
            @RequestParam("num1") Integer num1,
            @RequestParam("op") String op,
            @RequestParam("num2") Integer num2) {
        var resultado = 0;
        switch (op) {
            case "+":
                resultado = num1 + num2;
                break;
            case "-":
                resultado = num1 - num2;
                break;
            case "*":
                resultado = num1 * num2;
                break;
            case "/":
                resultado = num1 / num2;
                break;
            case "%":
                resultado = num1 % num2;
                break;
        }
        return String.format("%,d", resultado);
    }
}