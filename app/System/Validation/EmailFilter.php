<?php
declare(strict_types=1);

namespace App\System\Validation;

/**
 * Filtro de Segurança Corporativa contra E-mails Temporários (Disposable Emails).
 * Impede o uso de contas descartáveis para garantir a integridade da base de leads/clientes.
 */
class EmailFilter
{
    /**
     * Lista negra de domínios temporários comuns no mercado.
     * Em produção, isso poderia ser uma consulta a uma API externa ou cache de lista do GitHub.
     */
    private static array $disposableDomains = [
        'mailinator.com',
        'guerrillamail.com',
        'temp-mail.org',
        '10minutemail.com',
        'throwawaymail.com',
        'yopmail.com',
        'sharklasers.com',
        'getairmail.com',
        'dispostable.com',
        'mintemail.com',
        'maildrop.cc',
        'mail-temp.com',
        'tempmail.net',
        'anonbox.net',
        'trashmail.com',
        'mail7.io',
        'tempmail.com',
        'tempinbox.com',
        'fakeinbox.com',
        'nada.ltd',
        'mohmal.com',
        'disposablemail.com'
    ];

    /**
     * Domínios de e-mail "normais" permitidos (Mercado).
     */
    private static array $marketDomains = [
        'gmail.com',
        'outlook.com',
        'hotmail.com',
        'icloud.com',
        'yahoo.com',
        'yahoo.com.br',
        'live.com',
        'msn.com',
        'protonmail.com',
        'proton.me',
        'me.com'
    ];

    /**
     * Verifica se o e-mail é válido comercialmente (não é temporário).
     */
    public static function isDisposable(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);
        $domain = strtolower(trim($domain));

        return in_array($domain, self::$disposableDomains, true);
    }

    /**
     * Opcional: Verifica se é um e-mail de "mercado" comum.
     */
    public static function isMarketEmail(string $email): bool
    {
        $domain = substr(strrchr($email, "@"), 1);
        return in_array(strtolower($domain), self::$marketDomains, true);
    }
}
